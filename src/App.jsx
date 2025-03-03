import "./styles.css";
import { FitAddon } from "@xterm/addon-fit";
import { useEffect, useRef, useState } from "react";
import { useXTerm } from "react-xtermjs";
import useSize from "./useSize";
import { Readline } from "xterm-readline";
import chalk from "chalk";

const App = () => {
  const { instance, ref } = useXTerm();
  const fitAddon = new FitAddon();
  const terminalWrapper = useRef(null);
  const size = useSize(terminalWrapper);
  const readline = new Readline();

  const showPrompt = () => {
    readline.read(chalk.blue("desktop>"));
  };

  const commandBase = (command) => {
    switch (command) {
      case "mkdir":
        return "\r\n" + "new file created";
        break;

      case "date":
        return "\r\n" + new Date();
        break;

      case "cls":
        instance.reset();
        return;
        break;

      default:
        return "\r\n";
        break;
    }
  };

  useEffect(() => {
    if (instance) {
      ///////////////////////////////
      //// set up xTerm terminal ////
      ///////////////////////////////
      instance.loadAddon(fitAddon);
      instance.loadAddon(readline);
      fitAddon.fit();
      instance.options.cursorStyle = "block";
      instance.options.cursorBlink = true;

      setTimeout(showPrompt, 10);

      readline.setCheckHandler((text) => {
        if (commandBase(text)) {
          instance.writeln(commandBase(text));
        }
        readline.appendHistory(text);
        setTimeout(showPrompt, 20);
      });

      return () => {
        instance.dispose();
        readline.dispose();
      };
    }
  }, [instance]);

  return (
    <div ref={terminalWrapper}>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default App;
