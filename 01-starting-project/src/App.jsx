import { CORE_CONCEPTS } from "./data";
import { EXAMPLES } from "./data";
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept";
import TabButton from "./components/TabButton";
import { useState } from "react";

function App() {
  // let tabContent = 'Please click a button';
  const [tabContent, setTabContent] = useState("");

  function handleSelect(selectedButton) {
    console.log(`Hello World - ${selectedButton}`);
    // tabContent = selectedButton;
    setTabContent(selectedButton);
  }

  let selectedTab = <p>Please select a topic.</p>;
  if (tabContent) {
    selectedTab = (
      <div id="tab-content">
        <h3>{EXAMPLES[tabContent].title}</h3>
        <p>{EXAMPLES[tabContent].description}</p>
        <pre>
          <code>{EXAMPLES[tabContent].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concept</h2>
          <ul>
		  {CORE_CONCEPTS.map((conceptItem) => (
			<CoreConcept key ={conceptItem.title} {...conceptItem} />
		  ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              onSelect={() => handleSelect("components")}
              isSelected={tabContent === "components"}
            >
              Components
            </TabButton>
            <TabButton
              onSelect={() => handleSelect("jsx")}
              isSelected={tabContent === "jsx"}
            >
              JSX
            </TabButton>
            <TabButton
              onSelect={() => handleSelect("props")}
              isSelected={tabContent === "props"}
            >
              Props
            </TabButton>
            <TabButton
              onSelect={() => handleSelect("state")}
              isSelected={tabContent === "state"}
            >
              State
            </TabButton>
          </menu>
          {selectedTab}
        </section>
      </main>
    </div>
  );
}

export default App;
