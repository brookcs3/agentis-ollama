class ToolRegistry {
  constructor() {
    this.tools = [];
  }

  register(tool) {
    this.tools.push(tool);
  }

  list() {
    return this.tools;
  }
}

export default ToolRegistry;
