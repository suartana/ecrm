Ext.define('Docucrm.view.profile.UserData', {
	extend: 'Ext.DataView',
	xtype: 'userdata',

	cls: 'user-notifications',

	scrollable: false,

	bind: {
		store: '{userData}'
	},

	itemSelector: 'div.timeline-item',

	itemTpl: [
		"<div class='comments {[values._id !== values.parent_id ? 'sub-comments' : '']}'>",
		"<img src='/storage/images/{img}' alt='Smiley face' class='profile-icon'>",
		"<div class='content-wrap'>",
		"<div>",
		"<div class='content'>{firstname}. {lastname}</div>",
		"<div class='like-comment-btn-wrap'>",
		"<button type='button' class='x-fa fa-thumbs-up' onclick=''></button>",
		"<button type='button' class='x-fa fa-thumbs-down' onclick=''></button>",
		"<button type='button' onclick='' class='x-fa fa-comments'></button>",
		"</div>",
		"</div>",
		"</div>"
	]
});
