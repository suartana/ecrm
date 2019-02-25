<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SystemController extends AbstractController
{
    /**
     * @Route("/system", name="system")
     */
    public function index()
    {
        return $this->render('system/index.html.twig', [
            'controller_name' => 'SystemController',
        ]);
    }

	/**
	 *
	 * @Route("/system/navigation", name="system_navigation")
	 *
	 * @param Request $request
	 */
    public function navigation(Request $request)
    {
	    $acl = [
		    [
			    'text'=> 'Dashboard',
			    'iconCls'=> 'x-fa fa-home home',
			    'rowCls'=> 'nav-tree-badge nav-tree-badge-new',
			    'viewType'=> 'admindashboard',
			    'routeId' => 'dashboard',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Customers',
			    'iconCls'=> 'x-fa fa-users customers',
			    'viewType'=> 'email',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Products',
			    'iconCls'=> 'x-fa fa-suitcase products',
			    'viewType'=> 'email',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Sales',
			    'iconCls'=> 'x-fa fa-building sell',
			    'rowCls'=> 'nav-tree-badge nav-tree-badge-hot',
			    'viewType'=> 'email',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Marketing',
			    'iconCls'=> 'x-fa fa-pie-chart marketing',
			    'viewType'=> 'profile',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Activities',
			    'iconCls'=> 'x-fa fa-tasks activities',
			    'viewType'=> 'searchresults',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Collaboration',
			    'iconCls'=> 'x-fa fa-handshake-o collaboration',
			    'viewType'=> 'faq',
			    'leaf'=> true
		    ],

		    [
			    'text'=> 'Reports',
			    'iconCls'=> 'x-fa fa-bar-chart forms',
			    'viewType'=> 'forms',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Finance',
			    'iconCls'=> 'x-fa fa-money charts',
			    'viewType'=> 'charts',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'All',
			    'iconCls'=> 'x-fa fa-list-alt all',
			    'expanded'=> false,
			    'id' => 'all',
			    'itemId' => 'all',
			    'selectable'=> false
		    ],
		    [
			    'text'=> 'System Settings',
			    'iconCls'=> 'x-fa fa-cogs support',
			    'viewType'=> 'widgets',
			    'leaf'=> true
		    ]
	    ];

	    $all = [
		    [
			    'text'=> 'Blank Page',
			    'iconCls'=> 'x-fa fa-file-o marketing',
			    'viewType'=> 'pageblank',
			    'leaf'=> true
		    ],
		    [
			    'text'=> '404 Error',
			    'iconCls'=> 'x-fa fa-exclamation-triangle charts ',
			    'viewType'=> 'page404',
			    'leaf'=> true
		    ],
		    [
			    'text'=> '500 Error',
			    'iconCls'=> 'x-fa fa-times-circle home',
			    'viewType'=> 'page500',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Lock Screen',
			    'iconCls'=> 'x-fa fa-lock support',
			    'viewType'=> 'lockscreen',
			    'leaf'=> true
		    ],

		    [
			    'text'=> 'Login',
			    'iconCls'=> 'x-fa fa-check collaboration',
			    'viewType'=> 'login',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Register',
			    'iconCls'=> 'x-fa fa-pencil-square-o sell',
			    'viewType'=> 'register',
			    'leaf'=> true
		    ],
		    [
			    'text'=> 'Password Reset',
			    'iconCls'=> 'x-fa fa-lightbulb-o all',
			    'viewType'=> 'passwordreset',
			    'leaf'=> true
		    ]
	    ];

	    $jsonData = [
		    "success" => true,
		    "data" => $request->get("node") == 'all' ? $all : $acl
	    ];
	    $response = new JsonResponse($jsonData);
	    return $response;
    }
}
