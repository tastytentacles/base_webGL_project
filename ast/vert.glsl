attribute vec3 vec;
attribute vec2 tex_cords;

uniform vec3 pos;
uniform float scale;

varying vec2 v_tex_cords;


void main(void) {
	v_tex_cords = tex_cords;

	gl_Position = vec4(vec * scale + pos, 1.0);
}
