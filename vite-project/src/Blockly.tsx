// BlocklyComponent.tsx
import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';       
import 'blockly/javascript';   
import './CustomBlock'; 

const BlocklyComponent: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      const toolbox = {
        kind: 'flyoutToolbox',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_print' },
        ],
      };

      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox,
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
        trashcan: true,
      });
    }

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  return <div ref={blocklyDiv} style={{ height: '480px', width: '600px' }} />;
};

export default BlocklyComponent;
