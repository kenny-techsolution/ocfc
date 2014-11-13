define([
	"../var/support"
], function (support) {

<<<<<<< HEAD
	(function () {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div"));

		// #11217 - WebKit loses check when the name is after the checked attribute
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
=======
(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );
>>>>>>> a09b969e6e55601ac491c7749739eaff84bac2f2

		// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
		// old WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Make sure textarea (and checkbox) defaultValue is properly cloned
		// Support: IE9-IE11+
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	return support;

});
