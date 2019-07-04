function toggleElement(_divName, _aName, _txtVisible, _txtHidden){
	var _div = document.getElementById(_divName);
	var _a = document.getElementById(_aName);
	var bVisible = (_div.style.visibility == 'visible');
	if(bVisible){
		_div.style.visibility = 'hidden';
		_a.innerHTML = _txtHidden;
	}else{
		_div.style.visibility = 'visible';
		_a.innerHTML = _txtVisible;
	}
}

function toggleRobotVersion(){
	toggleElement(  'robot_version',
			'robot_version_toggle',
			'Hide robot version',
			'Show robot version');
}

function toggleUdid() {
    toggleElement('udid_check',
        'udid_toggle',
        'Hide the UDID checker',
        'Check if your device is authorized');
}

function makeResourceLink(_url, _desc, _date) {
    return {
        "url": _url,
        "desc": _desc,
        "date": _date
    };
}

function setLink(_aId, _url) {
    var _a = document.getElementById(_aId);
    _a.href = _url;
}


function renderResourceLink(_r) {
    var _s = '';
    var _bLink = false;
    if (_r.url != undefined && _r.url != '') {
        _bLink = true;
        _s += '<a href="';
        _s += _r.url;
        _s += '" target="new">'
    }
    _s += _r.desc;
    _s += ' <i>(updated on ' + _r.date + ')</i>';
    if (_bLink == true) {
        _s += "</a>";
    }
    return _s;
}

function renderResourceLinks(_rr) {
    var _s = "";
    _s += '<ul>';
    for (var i = 0; i < _rr.length; i++) {
        _s += '<li>';
        _s += renderResourceLink(_rr[i]);
        _s += '</li>';
    }
    _s += '</ul>';
    return _s;
}

function renderResourceLinksBlock(_parentId, _rr) {
    var _el = document.getElementById(_parentId);
    _el.innerHTML = renderResourceLinks(_rr);
}

function testUdid() {
    var udidField = document.forms["udidForm"]["udid"].value;
    var udidLower = udidField.toLowerCase();
    console.log("testing "+udidLower);
    if (udidLower == "") {
        alert("You need to insert your UDID in the proper field");
        return false;
    } else {
        
        var nUdids = devices["devices"].length;
        console.log("testing against " + nUdids + " authorized devices");
        for (var i = 0; i < nUdids; i++) {
            if (udidLower == devices["devices"][i]["UDID"]) {
                alert("This device is authorized");
                return true;
            }
        }
        alert("This device is NOT authorized");
        return false;
    }
}

function makeInstallerLink(_manifest) {
    var s = "itms-services:\/\/?action=download-manifest&url="+_manifest;
    return s;
}