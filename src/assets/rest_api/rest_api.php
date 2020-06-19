<?php
/** API ENDPOINTS */
add_action('rest_api_init', function () {

    // ROUTING ------------------------------------------------------------------------------------------------------------

    // STONES  ---------------------------------------------------

    // GET STONES
    register_rest_route('stonus/v1', 'stones', array(
        'methods' => WP_REST_Server::READABLE, // ou 'GET'
        'callback' => 'get_stones',
        'permission_callback' => function ($request) {
            return is_user_logged_in();
        },
    ));

    // GET STONE
    register_rest_route('stonus/v1', 'stones/(?P<stone_id>\d+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_stone',
        'args' => [
            'stone_id' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_numeric($param);
                },
            ),
        ],
        'permission_callback' => function ($request) {
            $stone_id = $request['stone_id'] ? $request['stone_id'] : null;
            $user_id = get_current_user_id();
            return isset($stone_id) && isset($user_id);
        },
    ));

    // CREATE STONE
    register_rest_route('stonus/v1', 'stones/add', array(
        'methods' => 'POST',
        'callback' => 'alx_create_stone',
        'permission_callback' => function ($request) {
            return is_user_logged_in();
        },
    ));

    // USERS  ---------------------------------------------------------------

    // GET USERS
    register_rest_route('stonus/v1', 'users', array(
        'methods' => WP_REST_Server::READABLE, // ou 'GET'
        'callback' => 'get_theUsers',
        // 'permission_callback' => function ($request) {
        //     return is_user_logged_in();
        // },
    ));

    // GET USER
    register_rest_route('stonus/v1', 'users/(?P<user_id>\d+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_TheUser',
        'args' => [
            'user_id' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_numeric($param);
                },
            ),
        ],
        'permission_callback' => function ($request) {
            //$user_id = $request['user_id'] ? $request['user_id'] : null;
            $user_id = get_current_user_id();
            return isset($user_id);
        },
    ));

    // CREATE USER
    register_rest_route('stonus/v1', 'users/register', array(
        'methods' => 'POST',
        'callback' => 'alx_create_user',
    ));

    

    // FUNCTIONS -----------------------------------------------------------------------------------------------------------

    // GET STONES -----------------------------------------------------

    function get_stones($request)
    {
        //return is_user_logged_in();
        $data = [];
        $params = $request->get_params();
        $stone_id = isset($params['stone_id']) ? esc_sql($params['stone_id']) : null;

        $stones = get_posts([
            'post_type' => 'stones', // ici je recupere le custom post
            'numberposts' => -1, // de base 10 -1 tous les avoir,
            'fields' => 'ids', // recuperer l'id des fields marche sans mais jaurais tous les fields de wp.

        ]);

        foreach ($stones as $stone) {
            $data[] = [
                'id' => $stone,
                'title' => get_the_title($stone),
                'latitude' => get_field('latitude', $stone),
                'longitude' => get_field('longitude', $stone),
                'createur' => get_field('createur', $stone),
                'description' => get_field('description', $stone),
                'inbag' => get_field('inbag', $stone),
                'photo' => [
                    'alt' => get_field('photo', $stone)['alt'],
                    'sizes' => [
                        'thumbnail' => get_field('photo', $stone)['sizes']['thumbnail'],
                        'medium' => get_field('photo', $stone)['sizes']['medium'],
                    ],
                ],
                'created_at' => get_the_date('Y-m-d', $stone),

            ];

            // if( $stone_id ) {
            //     $data = [$stone_id];
            //     }

        }
        return $data;

    }

    // GET STONE -----------------------------------------------------------

    function get_stone(WP_REST_Request $request)
    {

        $data = [];
        $params = $request->get_params();
        $stone_id = isset($params['stone_id']) ? esc_sql($params['stone_id']) : null;

        if ($stone_id) {
            $data = [
                'id' => $stone_id,
                'title' => get_the_title($stone_id),
                'latitude' => get_field('latitude', $stone_id),
                'longitude' => get_field('longitude', $stone_id),
                'createur' => get_field('createur', $stone_id),
                'description' => get_field('description', $stone_id),
                'inbag' => get_field('inbag', $stone_id),
                'photo' => [
                    'alt' => get_field('photo', $stone_id)['alt'],
                    'sizes' => [
                        'thumbnail' => get_field('photo', $stone_id)['sizes']['thumbnail'],
                        'medium'    => get_field('photo', $stone_id)['sizes']['medium'],
                    ],
                ],
                'created_at' => get_the_date('Y-m-d', $stone_id),
            ];
        }

        return $data;
    }


    // GET USERS -----------------------------------------------------

    function get_theUsers($request)
    {
        //return is_user_logged_in();
        $data = [];
        $params = $request->get_params();
        $user_id = isset($params['user_id']) ? esc_sql($params['user_id']) : null;
        $users = get_users();
        

 

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->id  ,
                'username' => $user->user_login,
                'prenom' => get_field('first_name', $user),
                'nom' => get_field('last_name', $user),
                'photo' => [
                    //'alt' => get_field('photo', $user_id)['alt'],
                    'sizes' => [
                        'thumbnail' => get_field('photo', 'user_' . $user->id)['sizes']['thumbnail'],
                        'medium' => get_field('photo', 'user_' . $user->id)['sizes']['medium'],
                    ],
                ],
                //'bag' => get_field('acf', $stone)['bag'],

            ];

    //         // if( $stone_id ) {
    //         //     $data = [$stone_id];
    //         //     }

        }
        return $data;

    }

    // GET USER

    function get_theUser(WP_REST_Request $request)
    {
        //global $User;

        $data = [];
        $params = $request->get_params();
        $user_id = isset($params['user_id']) ? esc_sql($params['user_id']) : null;
        //$userr = [$user_id];
        $userdata = get_userdata($user_id);
        //return $userdata; // Pour voir tout ce que retourne data dans postman !!!!!!
        if ($user_id) {

            $user_stones_ids =  get_field('bag', 'user_' . $user_id);
            $user_stones = [];
            foreach ($user_stones_ids as $user_stone) {
            $user_stones[] = [
                'id' => $user_stone,
                'title' => get_the_title($user_stone),
                'latitude' => get_field('latitude', $user_stone),
                'longitude' => get_field('longitude', $user_stone),
                'createur' => get_field('createur', $user_stone),
                'inbag' => get_field('inbag', $user_stone),
                'photo' => [
                    'alt' => get_field('photo', $user_stone)['alt'],
                    'sizes' => [
                        'thumbnail' => get_field('photo', $user_stone)['sizes']['thumbnail'],
                        'medium' => get_field('photo', $user_stone)['sizes']['medium'],
                    ],
                ],
                'created_at' => get_the_date('Y-m-d', $user_stone),

            ];
            }

            $data = [
                'id' => $user_id ,
                'userlogin'  => $userdata->user_login,
                'username'   =>$userdata->user_nicename,
                'prenom'     => get_field('first_name', $userdata),
                'nom'        => get_field('last_name', $userdata),
                'fullname'   => $userdata->display_name,
                'email'      => $userdata->user_email,
                'created_at' => $userdata->user_registered,
                'user_stone' => $user_stones,
                'photo' => [
                    //'alt' => get_field('photo', $user_id)['alt'],
                    'sizes' => [
                        'thumbnail' => get_field('photo', 'user_' . $user_id)['sizes']['thumbnail'],
                        'medium'    => get_field('photo', 'user_' . $user_id)['sizes']['medium'],
                    ],
                ],
                //'bag' => get_field('acf', $stone)['bag'],

            ];

        }

        return $data;
    }

    add_filter('jwt_auth_token_before_dispatch', 'login_returned_data', 10, 2); // ici jwt_auth_token_before_dispatch va avec le plugin
        function login_returned_data($data, $user){ // voir ligne 437 route totemus
            $user_id = $user->id;
            $data['id'] = $user_id;
            return $data;
    }

    // CREATE USER

    function alx_create_user(WP_REST_Request $request)
{
    
    $params = $request->get_body_params();
    $errors = new WP_Error();

    $email = isset($params['email']) ? $params['email'] : null;
    $password = isset($params['password']) ? $params['password'] : null;
    $firstname = isset($params['firstname']) ? $params['firstname'] : null;
    $lastname = isset($params['lastname']) ? $params['lastname'] : null;
    $lang = isset($params['lang']) ? $params['lang'] : null;
    $username = isset($params['username']) ? $params['username'] : null;

    /**
     * Data validations
     */
    if (!$email || $email == '') {
        $errors->add('empty', 'Email is required');
    } else {
        if (!is_email($email) || email_exists($email)) {
            $errors->add('invalid', 'Email is not valid');
        }
    }

    if (!$password || $password == '') {
        $errors->add('empty', 'Password is required');
    } else {
        if (strlen($password) < 5) {
            $errors->add('invalid', 'Password is too short');
        }
    }

    // if (!$firstname || $firstname == '') {
    //     $errors->add('empty', 'Firstname is required');
    // }

    // if (!$lastname || $lastname == '') {
    //     $errors->add('empty', 'Name is required');
    // }

    if (!$username || $username == '') {
        $errors->add('empty', 'Username is required');
    }

    if ($lang !== null) {
        if (!is_string($lang) || $lang == '' || strlen($lang) != 2) {
            $errors->add('invalid', 'Language format is not valid');
        } else {
            if (!in_array($lang, $all_languages)) {
                $errors->add('not found', 'This language is not available');
            }
        }
    } else {
        $lang = 'fr'; // Default lang
    }

    /**
     * Errors checking
     */
    if (!empty($errors->get_error_codes())) {
        return $errors;
    }

    /**
     * Create User
     */
    //$username = $email;
    $user_id = wp_insert_user([
        'user_login' => $username,
        'user_pass' => $password,
        'user_email' => $email,
        'first_name' => $firstname,
        'last_name' => $lastname,
        //'role' => 'hunters',
    ]);

    if (is_wp_error($user_id)) {
        $errors->add('unknow', 'A problem occurred while creating the user');
        return $errors;
    }

    // Set lang
    update_field('lang', $lang, 'user_' . $user_id);

    $userdata = get_userdata($user_id);
    $return = [
        'user_id' => $user_id,
        'username' => $userdata->user_login,
        'user_email' => $userdata->user_email,
    ];

    return new WP_REST_Response($return, 200);
}

// CREATE STONE

    function alx_create_stone(WP_REST_Request $request)
{
    
    $params = $request->get_params();
    $errors = new WP_Error();
    
    
    $title = isset($params['title']) ? $params['title'] : null;
    //return $title;
    $latitude = isset($params['latitude']) ? $params['latitude'] : null;
    $longitude = isset($params['longitude']) ? $params['longitude'] : null;
    $description = isset($params['description']) ? $params['description'] : null;
    $createur_id = isset($params['createur']) ? $params['createur'] : null;
    $photo = isset($params['photo']) ? $params['photo'] : null;
    $inbag = isset($params['inbag']) ? $params['inbag'] : null;
    //return $photo;
    //return $_FILES;
    // if ($_FILES) {
    //     require_once(ABSPATH . "wp-admin" . '/includes/image.php');
    //     require_once(ABSPATH . "wp-admin" . '/includes/file.php');
    //     require_once(ABSPATH . "wp-admin" . '/includes/media.php');
    //     $file_handler = 'photo';
    //     $attach_id = media_handle_upload($file_handler,$pid );
        
    // }
    
    
    //return $request;
    $stone_id = wp_insert_post([
        'post_type' => 'stones',
        'post_status'   => 'publish',
        //'id' => $stone,
        'post_title' => $title,
        'meta_input' => [
            'description' => $description,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'photo' => $photo,
            'createur' => $createur_id,
            'inbag' => $inbag,
        ]
        
    ]);

    // Apres la création de la pierre je dois l'afficher le sac de l'utilisateur.
    // Donc je dois recuperer l'id de l'utilisateur ( get_current_user_ID ne fonction qu'avec le permission callback )
    // Je dois ensuite récupérer le champ sac de mon utilisateur
    // Demander à loic
    // Puis j'update le field bag voir la doc pour les paramètres.
    
    $user_id = get_current_user_ID();
    $user_stones_ids =  get_field('bag', 'user_' . $user_id);

    $user_stones_ids[] = $stone_id;

    update_field('bag', $user_stones_ids, 'user_' . $user_id);
    
      
    if (is_wp_error($stone_id)) {
        $errors->add('unknow', 'A problem occurred while creating the stone');
        return $errors;
    }


    $stonedata = get_post($stone_id);
    $return = [
        'stone_id' => $stone_id,
        'title' => get_the_title($stone_id),
        'description' => $stonedata->description,
        'photo' => $stonedata->photo,
        'createur' => $stonedata->createur_id,
        'inbag' => $stonedata->inbag
    ];

    return new WP_REST_Response($return, 200);
}



    // SPECIAL ME RAPPELLER A QUOI CA SERT

    // The next filter fix a bug of access
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Expose-Headers: Link', false);
        return $value;
    });

});