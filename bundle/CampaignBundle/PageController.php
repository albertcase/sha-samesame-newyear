<?php
namespace CampaignBundle;

use Core\Controller;

class PageController extends Controller {

	public function indexAction() {
		$RedisAPI = new \Lib\RedisAPI();
		$config = $RedisAPI->jssdkConfig($this->request->getUrl(TRUE));
		$this->render('index', array('config' => $config));
	}

	public function clearCookieAction() {
		setcookie('_user', json_encode($user), time(), '/');
		$this->statusPrint('success');
	}

	public function jssdkAction() {
		$request = $this->request;
    	$fields = array(
			'url' => array('notnull', '120'),
		);
		$request->validation($fields);
		$url = $request->query->get('url');
		$RedisAPI = new \Lib\RedisAPI();
		$config = $RedisAPI->jssdkConfig($url);
		$this->dataPrint($config);
	}
}