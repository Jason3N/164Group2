import * as Blockly from 'blockly';
import 'blockly/javascript';

// Make sure Blockly.Blocks exists before defining blocks
if (Blockly.Blocks) {
  // SQL SELECT block
  Blockly.Blocks['sql_select'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("SELECT");
      this.appendValueInput("COLUMNS")
          .setCheck("String")
          .appendField("columns");
      this.appendValueInput("FROM")
          .setCheck("String")
          .appendField("FROM");
      this.appendValueInput("WHERE")
          .setCheck("Boolean")
          .appendField("WHERE")
          .setAlign(Blockly.ALIGN_RIGHT);
      this.setOutput(true, "Array");
      this.setColour(210);
      this.setTooltip("Performs a SQL SELECT query");
      this.setHelpUrl("");
    }
  };

  // SQL INSERT block
  Blockly.Blocks['sql_insert'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("INSERT INTO");
      this.appendValueInput("TABLE")
          .setCheck("String");
      this.appendValueInput("COLUMNS")
          .setCheck("Array")
          .appendField("columns");
      this.appendValueInput("VALUES")
          .setCheck("Array")
          .appendField("VALUES");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Inserts data into a table");
      this.setHelpUrl("");
    }
  };

  // SQL UPDATE block
  Blockly.Blocks['sql_update'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UPDATE");
      this.appendValueInput("TABLE")
          .setCheck("String");
      this.appendDummyInput()
          .appendField("SET");
      this.appendValueInput("SET")
          .setCheck("Object");
      this.appendValueInput("WHERE")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("Updates records in a table");
      this.setHelpUrl("");
    }
  };

  // SQL DELETE block
  Blockly.Blocks['sql_delete'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("DELETE FROM");
      this.appendValueInput("TABLE")
          .setCheck("String");
      this.appendValueInput("WHERE")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip("Deletes records from a table");
      this.setHelpUrl("");
    }
  };

  // SQL JOIN block
  Blockly.Blocks['sql_join'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ["INNER JOIN", "INNER JOIN"],
            ["LEFT JOIN", "LEFT JOIN"],
            ["RIGHT JOIN", "RIGHT JOIN"],
            ["FULL JOIN", "FULL JOIN"]
          ]), "JOIN_TYPE");
      this.appendValueInput("TABLE")
          .setCheck("String");
      this.appendValueInput("ON")
          .setCheck("Boolean")
          .appendField("ON");
      this.setOutput(true, "String");
      this.setColour(290);
      this.setTooltip("Joins tables together");
      this.setHelpUrl("");
    }
  };

  // SQL WHERE condition block
  Blockly.Blocks['sql_condition'] = {
    init: function() {
      this.appendValueInput("LEFT")
          .setCheck(["String", "Number"]);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ["=", "="],
            ["<>", "<>"],
            [">", ">"],
            ["<", "<"],
            [">=", ">="],
            ["<=", "<="],
            ["LIKE", "LIKE"],
            ["IN", "IN"]
          ]), "OPERATOR");
      this.appendValueInput("RIGHT")
          .setCheck(["String", "Number", "Array"]);
      this.setOutput(true, "Boolean");
      this.setColour(330);
      this.setTooltip("Creates a SQL condition");
      this.setHelpUrl("");
    }
  };

  // SQL Function block
  Blockly.Blocks['sql_function'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ["COUNT", "COUNT"],
            ["SUM", "SUM"],
            ["AVG", "AVG"],
            ["MAX", "MAX"],
            ["MIN", "MIN"]
          ]), "FUNCTION");
      this.appendValueInput("PARAM")
          .setCheck("String");
      this.setOutput(true, "String");
      this.setColour(260);
      this.setTooltip("SQL aggregate functions");
      this.setHelpUrl("");
    }
  };

  // Column list block
  Blockly.Blocks['sql_column_list'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Column list");
      this.appendStatementInput("COLUMNS")
          .setCheck("sql_column");
      this.setOutput(true, "Array");
      this.setColour(230);
      this.setTooltip("List of columns");
      this.setHelpUrl("");
    }
  };

  // Column item block
  Blockly.Blocks['sql_column'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("column:")
          .appendField(new Blockly.FieldTextInput("column_name"), "COLUMN_NAME");
      this.setPreviousStatement(true, "sql_column");
      this.setNextStatement(true, "sql_column");
      this.setColour(230);
      this.setTooltip("A column name");
      this.setHelpUrl("");
    }
  };

  // SQL String block
  Blockly.Blocks['sql_string'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("text:")
          .appendField(new Blockly.FieldTextInput("value"), "TEXT");
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("A text value");
      this.setHelpUrl("");
    }
  };

  // SQL Table name block
  Blockly.Blocks['sql_table'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("table:")
          .appendField(new Blockly.FieldTextInput("table_name"), "TABLE_NAME");
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("A table name");
      this.setHelpUrl("");
    }
  };
}

// Make sure Blockly.JavaScript exists before defining generators
if (Blockly.JavaScript) {
  Blockly.JavaScript['sql_select'] = function(block: Blockly.Block) {
    const columns = Blockly.JavaScript.valueToCode(block, 'COLUMNS', Blockly.JavaScript.ORDER_ATOMIC) || '["*"]';
    const table = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC) || '"table"';
    const where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC);
    
    let code = `executeSQL("SELECT " + ${columns}.join(", ") + " FROM " + ${table}`;
    if (where) {
      code += ` + " WHERE " + ${where}`;
    }
    code += ")";
    
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.JavaScript['sql_insert'] = function(block: Blockly.Block) {
    const table = Blockly.JavaScript.valueToCode(block, 'TABLE', Blockly.JavaScript.ORDER_ATOMIC) || '"table"';
    const columns = Blockly.JavaScript.valueToCode(block, 'COLUMNS', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
    const values = Blockly.JavaScript.valueToCode(block, 'VALUES', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
    
    return `executeSQL("INSERT INTO " + ${table} + " (" + ${columns}.join(", ") + ") VALUES (" + ${values}.join(", ") + ")");\n`;
  };

  Blockly.JavaScript['sql_update'] = function(block: Blockly.Block) {
    const table = Blockly.JavaScript.valueToCode(block, 'TABLE', Blockly.JavaScript.ORDER_ATOMIC) || '"table"';
    const set = Blockly.JavaScript.valueToCode(block, 'SET', Blockly.JavaScript.ORDER_ATOMIC) || '{}';
    const where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC) || 'true';
    
    return `executeSQL("UPDATE " + ${table} + " SET " + 
      Object.entries(${set}).map(([k, v]) => k + " = " + v).join(", ") + 
      " WHERE " + ${where});\n`;
  };

  Blockly.JavaScript['sql_delete'] = function(block: Blockly.Block) {
    const table = Blockly.JavaScript.valueToCode(block, 'TABLE', Blockly.JavaScript.ORDER_ATOMIC) || '"table"';
    const where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_ATOMIC) || 'true';
    
    return `executeSQL("DELETE FROM " + ${table} + " WHERE " + ${where});\n`;
  };

  Blockly.JavaScript['sql_join'] = function(block: Blockly.Block) {
    const joinType = block.getFieldValue('JOIN_TYPE');
    const table = Blockly.JavaScript.valueToCode(block, 'TABLE', Blockly.JavaScript.ORDER_ATOMIC) || '"table"';
    const on = Blockly.JavaScript.valueToCode(block, 'ON', Blockly.JavaScript.ORDER_ATOMIC) || 'true';
    
    const code = `"${joinType} " + ${table} + " ON " + ${on}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['sql_condition'] = function(block: Blockly.Block) {
    const left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC) || '"column"';
    const operator = block.getFieldValue('OPERATOR');
    const right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '"value"';
    
    let rightCode = right;
    if (operator === 'IN') {
      rightCode = `"(" + ${right}.join(", ") + ")"`;
    }
    
    const code = `${left} + " ${operator} " + ${rightCode}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['sql_function'] = function(block: Blockly.Block) {
    const func = block.getFieldValue('FUNCTION');
    const param = Blockly.JavaScript.valueToCode(block, 'PARAM', Blockly.JavaScript.ORDER_ATOMIC) || '"*"';
    
    const code = `"${func}(" + ${param} + ")"`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['sql_column_list'] = function(block: Blockly.Block) {
    const columns = Blockly.JavaScript.statementToCode(block, 'COLUMNS');
    
    // Extract column names from the generated code
    const columnRegex = /\/\/ Column: (.*)/g;
    const columnNames = [];
    let match;
    
    while ((match = columnRegex.exec(columns)) !== null) {
      columnNames.push(`"${match[1]}"`);
    }
    
    return [`[${columnNames.join(', ')}]`, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['sql_column'] = function(block: Blockly.Block) {
    const columnName = block.getFieldValue('COLUMN_NAME');
    return `// Column: ${columnName}\n`;
  };

  Blockly.JavaScript['sql_string'] = function(block: Blockly.Block) {
    const text = block.getFieldValue('TEXT');
    return [`"'${text}'"`, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['sql_table'] = function(block: Blockly.Block) {
    const tableName = block.getFieldValue('TABLE_NAME');
    return [`"${tableName}"`, Blockly.JavaScript.ORDER_ATOMIC];
  };
}

// // Helper function for executing SQL (placeholder for actual implementation)
// function executeSQL(sqlQuery) {
//   console.log(`Executing SQL: ${sqlQuery}`);
//   // In a real implementation, this would connect to a database
//   return [];
// }

// export { executeSQL };