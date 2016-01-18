var prog = null;
var gl = null;
var c = null;

function init() {
  console.log("this is the init function; saying hello.");

  c = document.getElementById("myCanvas");
	var wgl = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	for (var n = 0; n < wgl.length; ++n) {
		try { gl = c.getContext(wgl[n], { antialias: false }); }
		catch (e) {}
		if (gl) { break; }
	}

	if (gl == null)
		{ alert("dead webGL; RIP"); }


	var vs = grep_shader(gl, "shader-vs");
	var fs = grep_shader(gl, "shader-fs");
	prog = gl.createProgram();
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
		{ alert("Shader died, RIP Shader"); }
	gl.useProgram(prog);

  // prog.vec = gl.getAttribLocation(prog, "vec");
	// gl.enableVertexAttribArray(prog.vec);

  // prog.tex0 = gl.getUniformLocation(prog, "tex0");
	// gl.uniform1i(prog.tex0, 0);

  // needs vert_buff to be defined as a null at the begining of the document.
  // vert_buff = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, vert_buff);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.DYNAMIC_DRAW);
	// gl.vertexAttribPointer(prog.vec, 3, gl.FLOAT, false, 0, 0);
	// gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // prog.pos = gl.getUniformLocation(prog, "pos");

  // needs tex3 to be defined as a null with vert_buff
  // tex3 = gl.createTexture();
	// new_img(tex3, "/ast/tile.gif");

  //enable alpha blending
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	//engable back face culling
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);

	//enable depth test
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

  render_loop();
}


function render_loop() {
	var rAniFrame = (
	function() {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) { window.setTimeout(callback, 1000/60); };
	}
	)();

	rAniFrame(render_loop);
  // game logic loop goes hear.

  c.width = window.innerWidth;
	c.height = window.innerHeight;

	var c_dat = [c.width, c.height];
	if (c_dat[0] < c_dat[1]) {
		gl.viewport(0, (c_dat[1] - c_dat[0]) / 2, c_dat[0], c_dat[0]);
	} else {
		gl.viewport((c_dat[0] - c_dat[1]) / 2, 0, c_dat[1], c_dat[1]);
	}

	gl.clearDepth(1.0);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
