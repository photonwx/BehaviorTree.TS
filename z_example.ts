import t_node from "./t_node";
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

