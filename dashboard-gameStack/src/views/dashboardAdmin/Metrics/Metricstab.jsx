import { useState } from "react";
import styles from "./Metricstab.module.css";
import GraphSales from "./GraphSales";
import GBestSeller from "./GraphBestSeller";
import GraphSales2 from "./GraphSales2"
function Tabs({ tabs, ArrayVentas }) {
  const [activeTab, setActiveTab] = useState(0);
  // console.log("array ventas", ArrayVentas)
  return (
    <div className={styles.main_container}>
      <div className={styles.tabs_container}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={activeTab === index ? styles.tab_active : styles.tab}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className={styles.tab_content}>
          {tabs[activeTab].content}
          {activeTab === 0 && <GraphSales data={ArrayVentas} />}
          {activeTab === 1 && <GBestSeller data={ArrayVentas} />}
          {activeTab === 2 && <GraphSales2 data={ArrayVentas} />}
        </div>
      </div>
    </div>
  );
}
export default Tabs;
