<?php
/**
 * Created by PhpStorm.
 * User: gede
 * Date: 2018/08/12
 * Time: 2:02 PM
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function index(): Response
    {
       
        $user = $this->getUser();

        return $this->render('index.html.twig');
    }

    public function user(): Response
    {   $user = $this->getUser();

        return $this->render('user/index.html.twig');
    }

    public function list(Request $request)
    {
    	$data = [
    		"succes" => true,
    	    "data" => 123
	    ];
    	$response = new JsonResponse($data);

        return $response;
    }

	public function treelist(Request $request)
	{
		$data = [
			"succes" => true,
			"data" => 123
		];
		$response = new JsonResponse($data);

		return $response;
	}

}