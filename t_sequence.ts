import t_node  from "./t_node";
export default class t_sequence extends t_node {
    nodes: Array<t_node>;
    curid: number;
    is_running: boolean;
    /**
     * 顺序执行，所有成功=成功，一个失败=失败 失败后中断
     */
    constructor(nodes: Array<t_node>) {
        super();
        this.nodes = nodes;
    }
    enter(): void {
        if (!this.is_running) {
            this.curid = 0;
        }
    }
    tick(): e_status {
        while (this.curid < this.nodes.length) {
            let node = this.nodes[this.curid];
            if (this.is_running == false)
                node.enter();
            let ret = node.tick();
            switch (ret) {
                case e_status.running:
                    this.is_running = true;
                    return e_status.running;
                case e_status.success:
                    this.is_running = false;
                    node.exit();
                    this.curid++;
                    if (this.curid < this.nodes.length) continue;
                    else return e_status.success;
                case e_status.failure:
                    this.is_running = false;
                    node.exit();
                    return e_status.failure;
                default:
                    break;
            }
        }
        return e_status.success;
    }
    exit(): void {

    }
}