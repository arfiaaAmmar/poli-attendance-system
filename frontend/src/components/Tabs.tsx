import { useState } from "react";
import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";

type TabsProps = {
  labels: string[];
  defaultTab: number;
  onTabChange?: (tabIndex: number) => void;
};

const Tabs: React.FC<TabsProps> = ({ labels, defaultTab, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <MuiTabs
      value={selectedTab}
      onChange={handleChangeTab}
      indicatorColor="primary"
      textColor="primary"
    >
      {labels.map((label, index) => (
        <MuiTab key={index} label={label} />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
