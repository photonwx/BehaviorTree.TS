import t_node from "./t_node";
export default class t_behavior_tree extends t_node {
    root: t_node;
    started: boolean;

    constructor(root: t_node) {
        super();
        this.root = root;
        this.started = !1;
    }
    enter(): void {

    }
    tick(): e_status {
        if (this.started) {
            return e_status.running;
        }
        else {
            this.started = true;
            this.root.enter();
            let ret = this.root.tick();
            switch (ret) {
                case e_status.running:
                    this.started = false;
                    break;
                case e_status.success:
                    this.root.exit();
                    this.started = false;
                    break;
                case e_status.failure:
                    this.root.exit();
                    this.started = false;
                    break;
                default:
                    break;
            }
            return ret;
        }
    }
    exit(): void {

    }
}
