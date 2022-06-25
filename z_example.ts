import t_node from "./t_node";
import t_behavior_tree from "./t_behavior_tree";
import t_sequence from "./t_sequence";
import t_selector from "./t_selector";
import t_random from "./t_random";
////////////////
export class t_looking extends t_node {
	enter(): void {
		console.log("looking_enter ", this);
	}
	tick(): e_status {
		console.log("looking_tick ", this);
		return e_status.success;
	}
	exit(): void {
		console.log("looking_exit ", this);
	}
};

export class t_running extends t_node {
	dir: string;
	constructor(dir: string) {
		super();
		this.dir = dir;
	}

	enter(): void {
		console.log("running_enter ", this, this.dir);
	}
	tick(): e_status {
		console.log("running_tick ", this, this.dir);
		return e_status.success;
	}
	exit(): void {
		console.log("running_exit ", this, this.dir);
	}
};

export class t_standing extends t_node {
	count: number;
	constructor(count: number) {
		super();
		this.count = count;
	}
	enter(): void {
		console.log("standing_enter ", this);
	}
	tick(): e_status {
		this.count++;
		console.log("standing_tick , stanging_count ", this, this.count);
		if (this.count > 4)
			return e_status.success;
		else if (this.count >= 3 && this.count <= 4)
			return e_status.failure;
		else
			return e_status.running;
	}
	exit(): void {
		console.log("standing_exit ", this);
	}
};

(function test() {
	var bt: t_behavior_tree = new t_behavior_tree(
		new t_sequence([new t_selector([
			new t_standing(0),
			new t_looking(),
		]),
		new t_random
			([
				new t_running("SOUTH"),
				new t_running("WEST"),
				new t_running("EAST"),
				new t_running("NORTH"),
			]),
		])
	);

	for (var tick = 0; tick < 10; ++tick) {
		console.log("behaviour_tree_tick", tick);
		bt.tick();
	}
})();
