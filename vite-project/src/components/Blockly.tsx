import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './CustomBlock';


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

  // Default categories if none are provided
  const defaultCategories: ToolboxCategory[] = [
    {
      name: 'SQL Commands',
      colour: '#5C81A6',
      blocks: ['controls_if', 'logic_compare', 'logic_operation', 'logic_negate', 'logic_boolean']
    },
    {
      name: 'Tables',
      colour: '#A6745C',
      blocks: ['text', 'text_print', 'text_join', 'text_length']
    }
  ];

  const categories = initialCategories || defaultCategories;

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
    }

    return () => {
      workspaceRef.current?.dispose();
    };
  }, [categories]);

  return (
    <div>
      <div ref={blocklyDiv} style={{ height: '500px', width: '1280px' }} />
    </div>
  );
};

export default BlocklyComponent;