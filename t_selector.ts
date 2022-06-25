import t_node from "./t_node";

export default class t_selector extends t_node {
    nodes: Array<t_node>;
    curid: number;
    is_running: boolean;
    /**
     * 顺序执行 一个成功=成功, 全失败=失败 成功就中断
     * @param nodes 
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
                    return e_status.success;
                case e_status.failure:
                    this.is_running = false;
                    node.exit();
                    this.curid++;
                    if (this.curid < this.nodes.length)
                        continue;
                    else
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