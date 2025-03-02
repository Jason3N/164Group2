import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
// Import all SQL custom blocks defined above

interface BlocklyComponentProps {
  initialCategories?: ToolboxCategory[];
}

interface ToolboxCategory {
  name: string;
  colour: string;
  blocks: string[];
}

const BlocklyComponent: React.FC<BlocklyComponentProps> = ({ initialCategories }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  // SQL-specific categories
  const sqlCategories: ToolboxCategory[] = [
    {
      name: 'SQL Commands',
      colour: '#5C81A6',
      blocks: ['sql_select', 'sql_insert', 'sql_update', 'sql_delete']
    },
    {
      name: 'Tables',
      colour: '#A6745C',
      blocks: ['sql_table', 'sql_join']
    },
    {
      name: 'Columns',
      colour: '#5CA694',
      blocks: ['sql_column_list', 'sql_column', 'sql_string', 'sql_function']
    },
    {
      name: 'Conditions',
      colour: '#A65C8A',
      blocks: ['sql_condition', 'logic_operation', 'logic_negate']
    }
  ];

  const categories = initialCategories || sqlCategories;

  useEffect(() => {
    if (blocklyDiv.current) {
      // Build category-based toolbox
      const toolboxCategories = categories.map(category => ({
        kind: 'category',
        name: category.name,
        colour: category.colour,
        contents: category.blocks.map(block => ({ kind: 'block', type: block }))
      }));

      const toolbox = {
        kind: 'categoryToolbox',
        contents: toolboxCategories
      };

      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox,
        horizontalLayout: false,
        toolboxPosition: 'start',
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        trashcan: true,
      });

      // Add a function to convert blocks to SQL
      (window as any).generateSQL = () => {
        if (workspaceRef.current) {
          const code = Blockly.JavaScript.workspaceToCode(workspaceRef.current);
          return code;
        }
        return '';
      };
    }

    return () => {
      workspaceRef.current?.dispose();
    };
  }, [categories]);

  return (
    <div>
      <div ref={blocklyDiv} style={{ height: '500px', width: '1280px' }} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => alert((window as any).generateSQL())}>
          Generate SQL
        </button>
      </div>
    </div>
  );
};

export default BlocklyComponent;