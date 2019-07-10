/**
 * Define main controller
 *
 * @version v$i
 * @author Gede Suartana <gede.suartana@docu.ch>
 */

Ext.define('Docucrm.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	/**
	 * Set the listener controller
	 */
	listen : {
		controller : {
			'#' : {
				unmatchedroute : 'onRouteChange'
			}
		}
	},
	/**
	 * Set the application routes
	 */
	routes: {
		':node': {
			before: 'wait',
			action: 'onRouteChange'
		}
	},
	/**
	 * Set the private variable
	 */
	lastView: null,
	/**
	 * Route before show node action
	 *
	 * @param id
	 * @param action
	 */
	beforeShowNode: function (id, action) {
		/*var view = this.getView();
		var tab = view.getComponent(id);

		if (tab) {
			action.resume();
		} else {
			this.onBadRoute();
		}*/
		console.log("id",id,"action",action);
	},
	wait : function() {
		var args   = Ext.Array.slice(arguments),
			action = args.pop(),
			store  = Ext.getStore('storeNavigationTreeId');

		if (store.loading) {
			store.on('load', action.resume, action);
		} else {
			action.resume();
		}
	},
	/**
	 * Route show node action
	 *
	 * @param id
	 */
	showNode: function(id){
		console.log("id",id);
	},

	/**
	 * Route login action
	 *
	 * @param id
	 */
	showLogin:function(id){
		this.setCurrentView("login");
	},
	/**
	 * Set the current action view
	 *
	 * @param hashTag
	 */
	setCurrentView: function(hashTag) {
		hashTag = (hashTag || '').toLowerCase();

		var me = this,
			refs = me.getReferences(),
			mainCard = refs.mainCardPanel,
			mainLayout = mainCard.getLayout(),
			navigationList = refs.navigationTreeList,
			store = Ext.StoreManager.get("storeNavigationTreeId"),
			node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag),
			viewStore = (node && node.get('viewType')) ? node.get('viewType') : 'admindashboard',
			view = hashTag === 'profile' ? hashTag : viewStore,
			lastView = me.lastView,
			existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
			newView;
		console.log("view",view,"viewtype",node);
		//me.keeplive();

		// Kill any previously routed window
		if (lastView && lastView.isWindow) {
			lastView.destroy();
		}

		lastView = mainLayout.getActiveItem();

		if (!existingItem) {
			newView = Ext.create({
				xtype: view,
				routeId: hashTag,  // for existingItem search later
				hideMode: 'offsets'
			});
		}

		if (!newView || !newView.isWindow) {
			// !newView means we have an existing view, but if the newView isWindow
			// we don't add it to the card layout.
			if (existingItem) {
				// We don't have a newView, so activate the existing view.
				if (existingItem !== lastView) {
					mainLayout.setActiveItem(existingItem);
				}
				newView = existingItem;
			}
			else {
				// newView is set (did not exist already), so add it and make it the
				// activeItem.
				Ext.suspendLayouts();
				mainLayout.setActiveItem(mainCard.add(newView));
				Ext.resumeLayouts(true);
			}
		}

		navigationList.setSelection(node);

		if (newView.isFocusable(true)) {
			newView.focus();
		}

		me.lastView = newView;
	},
	/**
	 * Redirect route with the tree selection onchange parameter
	 *
	 * @param tree
	 * @param node
	 */
	onNavigationTreeSelectionChange: function (tree, node) {
		var to = node && (node.get('routeId') || node.get('viewType'));

		if (to) {
			this.redirectTo(to);
		}
	},
	/**
	 * Toggle navigation list
	 *
	 */
	onToggleNavigationSize: function () {
		var me = this,
			sImage = '<div class="main-logo"><img src="resources/images/logo.png" width="22px"></div>',
			lImage = '<div class="main-logo"><img class="documedia" src="resources/images/login_logo.png" width="210px" valign="center"></div>',
			documediaLog = Ext.ComponentQuery.query("#documediaLogo")[0],
			refs = me.getReferences(),
			navigationList = refs.navigationTreeList,
			wrapContainer = refs.mainContainerWrap,
			collapsing = !navigationList.getMicro(),
			new_width = collapsing ? 64 : 250;

		collapsing ? documediaLog.update(sImage) : documediaLog.update(lImage);

		if (Ext.isIE9m || !Ext.os.is.Desktop) {
			Ext.suspendLayouts();

			refs.senchaLogo.setWidth(new_width);

			navigationList.setWidth(new_width);
			navigationList.setMicro(collapsing);

			Ext.resumeLayouts(); // do not flush the layout here...

			// No animation for IE9 or lower...
			wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
			wrapContainer.updateLayout();  // ... since this will flush them
		}
		else {
			if (!collapsing) {
				// If we are leaving micro mode (expanding), we do that first so that the
				// text of the items in the navlist will be revealed by the animation.
				navigationList.setMicro(false);
			}
			navigationList.canMeasure = false;

			// Start this layout first since it does not require a layout
			refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

			// Directly adjust the width config and then run the main wrap container layout
			// as the root layout (it and its chidren). This will cause the adjusted size to
			// be flushed to the element and animate to that new size.
			navigationList.width = new_width;
			wrapContainer.updateLayout({isRoot: true});
			navigationList.el.addCls('nav-tree-animating');

			// We need to switch to micro mode on the navlist *after* the animation (this
			// allows the "sweep" to leave the item text in place until it is no longer
			// visible.
			if (collapsing) {
				navigationList.on({
					afterlayoutanimation: function () {
						navigationList.setMicro(true);
						navigationList.el.removeCls('nav-tree-animating');
						navigationList.canMeasure = true;
					},
					single: true
				});
			}
		}
	},
	/**
	 * Redirect to dashboard if the location hash is empty
	 */
	onMainViewRender:function() {
		if (!window.location.hash) {
			this.redirectTo("dashboard");
		}
	},
	/**
	 * Create current view content
	 *
	 * @param id
	 */
	onRouteChange:function(id){
		this.setCurrentView(id);
	},
	/**
	 * Define Search route
	 *
	 */
	onSearchRouteChange: function () {
		this.setCurrentView('searchresults');
	},
	/**
	 * Switching to the modern View
	 *
	 */
	onSwitchToModern: function () {
		Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
			this.onSwitchToModernConfirmed, this);
	},
	/**
	 * Message alert if the user switch to modern view
	 *
	 * @param choice
	 */
	onSwitchToModernConfirmed: function (choice) {
		if (choice === 'yes') {
			var s = window.location.search;

			// Strip "?classic" or "&classic" with optionally more "&foo" tokens
			// following and ensure we don't start with "?".
			s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

			// Add "?modern&" before the remaining tokens and strip & if there are
			// none.
			window.location.search = ('?modern&' + s).replace(/&$/, '');
		}
	},
	/**
	 * Set route email
	 *
	 */
	onEmailRouteChange: function () {
		this.setCurrentView('email');
	},
	/**
	 * Keep app alive
	 * @todo please find out how to track if the user session expired
	 */
	keeplive : function(){


	},
	/**
	 * On Toolbar button logout click show messagebox comfirm
	 *
	 * @return {void}
	 */
	onLogoutClick:function(){
		var me = this;
		Ext.MessageBox.confirm({
			title: Translate.title('Logout')+ '?',
			msg: Translate.auth( 'UserLogout'),
			buttons: Ext.MessageBox.OKCANCEL,
			scope: this,
			icon: Ext.MessageBox.QUESTION,
			fn: function(btn) {
				if (btn === 'ok') {
					me.doLogoutUser();
				}
			}
		});
	},
	/**
	 * Call api logout
	 *
	 * @return {void}
	 */
	doLogoutUser :function () {
		var view = this.getView();
		//tell the user have to wait
		view.mask(Translate.submit('PleaseWait')+"...");
		// This ternary operator determines the value of the TutorialLoggedIn key.
		// If TutorialLoggedIn isn't true, we display the login window,
		// otherwise, we display the main view
		Ext.Ajax.request({
			headers : Helpers.apiHeaders(),
			url: '/api/crm/logout',
			scope: this,
			method:'POST',
			success: function(response) {
				//clear the local storage
				ExtStorage.clearExpired();
				//to be sure token is cleared
				ExtStorage.setItem("tokens", "");
				//redirect to login window
				Tools.redirect("/user/#login");
				view.unmask();
			},
			failure: function(response) {
				ExtStorage.setItem("tokens", "");
				ExtStorage.clear();
				Message.infoBox("Error",Translate.error("ReportAdmin") );
			}
		});
	},

	onUserProvileClick:function(){
		Message.infoBox("Info","My Profile");
	},
	/**
	 *
	 * @param elem
	 * @return void
	 */
	onLanguageSelect:function(elem){
		var locale = elem.getValue(),
			view = this.getView();

		//tell the user have to wait
		view.mask(Translate.submit('PleaseWait')+"...");

		Ext.Ajax.request({
			headers : Helpers.apiHeaders(),
			method: "GET",
			url: "api/users/setlocale",
			params:{locale:locale},
			scope: this,
			success: function(response, opts) {
				var obj = Ext.JSON.decode(response.responseText),title;
				title = obj.success ? "Info" : "Error" ;
				ExtStorage.setItem("locale", locale);
				ExtStorage.setItem("languages", JSON.stringify(obj.datalang));
				Message.infoBox(title,obj.message);
				ExtStorage.isExists("languages") ? window.location.href = "/user/#dashboard" : false;
				view.unmask();
			},
			failure: function(response) {
				Message.infoBox("Error",Translate.error("ReportAdmin"));
			}
		});
	},
	myProfile:function (button) {
		this.redirectTo('profile', true);
	}


});
