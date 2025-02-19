import * as Blockly from 'blockly';
import 'blockly/blocks'; 
import 'blockly/javascript';

Blockly.Blocks['greeting'] = {
  init: function () {
    this.appendDummyInput().appendField("say hello");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Returns a greeting message.");
    this.setHelpUrl("");
  },
};


