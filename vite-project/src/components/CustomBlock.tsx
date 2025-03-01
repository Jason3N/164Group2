import * as Blockly from 'blockly';
import 'blockly/javascript';


if (Blockly.Blocks) {
  Blockly.Blocks['my_custom_block'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("my custom action");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip("This is a custom block");
      this.setHelpUrl("");
    }
  };
}

if (Blockly.JavaScript) {
  Blockly.JavaScript['my_custom_block'] = function(block: Blockly.Block) {
    const blockId = block.id;
    return `console.log("Custom block executed from block ${blockId}!");\n`;
  };
}