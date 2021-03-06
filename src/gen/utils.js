function get_xy(index, width) {
	var n = {x: 0, y: 0};
	n.y = Math.floor(index / width);
	n.x = index - n.y * width;
	return n;
}

function new_img(texture, src){
	var img = new Image();
	img.onload = function() {image_init(img, texture)};
	img.src = src;
}

function image_init(image, texture) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		image
	);
	gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

function check_distence(p1, p2) {
	return Math.sqrt(Math.pow(2, p1.x - p2.x) + (2, p1.y - p2.y));
}

function grep_shader(gl, url, id) {
	var shad_http = new XMLHttpRequest();
	shad_http.open("GET", url, false);
	shad_http.send(null);
	var shad_pass = shad_http.responseText;

	var shad_shad = null;
	if (id == "frag") {
		shad_shad = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (id == "vert") {
		shad_shad = gl.createShader(gl.VERTEX_SHADER);
	}

	gl.shaderSource(shad_shad, shad_pass);
	gl.compileShader(shad_shad);

	if (!gl.getShaderParameter(shad_shad, gl.COMPILE_STATUS))
		{ alert(gl.getShaderInfoLog(shad_shad)); }

	return shad_shad;
}
