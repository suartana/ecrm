Ext.define('Docucrm.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
		':login': {
			action: 'showLogin',
			before: 'beforeShowLogin'
		},
		':node': {
			before: 'beforeSetObj',
			action: 'onRouteChange'
		},
		':node/:id': {
			action: 'showNode',
			before: 'beforeShowNode'
		}
    },

	beforeShowLogin:function(id,action){
		console.log("login ....","id",id,"action",action);
	},

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

	showNode: function(id){
    	console.log("id",id);
	},

	showLogin:function(id){
    	console.log("show login...");
		this.setCurrentView("login");
	},

	beforeNavigateDeep: function (id, state, action) {
		var view = this.getView();
		var tab = view.getComponent(id);
		var valid;

		if (tab.isValidState) {
			valid = tab.isValidState(state);
		}

		if (valid) {
			action.resume();
		} else {
			this.onBadRoute();
		}
	},

	getTabRoute: function (tab) {
		var route = tab.xtype;

		if (tab.getActiveState) {
			route += '/' + (tab.getActiveState() || tab.getDefaultActiveState());
		}

		return route;
	},

	beforeSetObj: function(card, action) {
        var store = Ext.getStore('NavigationTree');
        if (!store.isLoaded()) {
            store.on('load', action.resume, action);
        } else {
            action.resume();
        }
        console.log("card",card,"action",action);
    },

    lastView: null,

    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag) ||
                   store.findNode('viewType', hashTag),
            view = (node && node.get('viewType')) || hashTag === 'login' ? hashTag : 'page404',
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

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

        if (!newView || !newView.isWindow) { //console.log("newView",newView);
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else { //console.log("setActiveItem newView",newView);
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

	onBadRoute: function () {
		var app = ExecDashboard.app.getApplication();
		this.redirectTo(app.getDefaultToken());
	},

	onNavigate: function (id) {
		var tabs = this.getView();

		var tab = tabs.setActiveTab(id);
		if (tab) {
			// if we changed active tabs...
			var route = this.getTabRoute(tab);
			if (route && route !== id) {
				this.redirectTo(route);
			}
		}
	},

	onNavigateDeep: function (id, state) {
		var tabs = this.getView();
		var tab = tabs.setActiveTab(id) || tabs.getActiveTab();

		tab.setActiveState(state);
	},

	onTabChange: function (mainView, newTab) {
		var route = this.getTabRoute(newTab);
		this.redirectTo(route);
	},

	onMenuClick: function (menu, item) {
		this.getView().setActiveTab(menu.items.indexOf(item) + 1); // +1 for invisible first tab
	},

	onSwitchTool: function (e) {
		var menu = this.menu;

		if (!menu) {
			menu = this.getView().assistiveMenu;
			this.menu = menu = new Ext.menu.Menu(menu);
		}

		menu.showAt(e.getXY());
	},

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            sImage = '<div class="main-logo"><img src="resources/images/logo.png" width="22px"></div>',
			lImage = '<div class="main-logo"><img class="documedia" src="resources/images/login_logo.png" width="210px" valign="center"></div>',
            documediaLog = Ext.getCmp("documediaLogo"),
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

    onMainViewRender:function() {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

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

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },

	onUnmatchedRoute: function(token) {
		if (token) {
			this.onBadRoute();
		}
	}
});
