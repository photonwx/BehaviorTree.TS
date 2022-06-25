import t_node from "./t_node";

export default class t_random extends t_node {
    nodes: Array<t_node>;
    curid: number;
    is_running: boolean;
    /**随机一个子节点，子节点成功=成功 子节点失败=失败 */
    constructor(nodes: Array<t_node>) {
        super();
        this.nodes = nodes;
    }
    enter(): void {
        if (this.is_running == false) {
            this.curid = 0;
        }
        this.curid = Math.floor(Math.random() * this.nodes.length);
        console.log(">>> random_enter running_idx ", this.curid);
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
                    return e_status.success;
                case e_status.failure:
                    this.is_running = false;
                    node.exit();
                    return e_status.failure;
                default:
                    break;
            }
        }
        return e_status.failure;
    }
    exit(): void {

    }
}