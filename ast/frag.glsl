#ifdef GL_ES
precision highp float;
#endif

uniform vec4 col;
uniform sampler2D tex0;

varying vec2 v_tex_cords;


void main(void) {
	vec4 tex = texture2D(tex0, v_tex_cords) * col;

	if (tex.a > 0.5) {
		gl_FragColor = tex;
	} else {
		discard;
	}
}
