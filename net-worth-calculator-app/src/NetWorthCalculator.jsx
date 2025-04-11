
// NetWorthCalculator.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState([{ description: "", value: "" }]);
  const [liabilities, setLiabilities] = useState([{ description: "", value: "" }]);

  const handleChange = (type, index, field, value) => {
    const copy = [...(type === "asset" ? assets : liabilities)];
    copy[index][field] = value;
    type === "asset" ? setAssets(copy) : setLiabilities(copy);
  };

  const addField = (type) => {
    const setter = type === "asset" ? setAssets : setLiabilities;
    setter((prev) => [...prev, { description: "", value: "" }]);
  };

  const total = (items) => items.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);

  const totalAssets = total(assets);
  const totalLiabilities = total(liabilities);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Net Worth Calculator</h1>
      <p className="text-center mb-6 text-gray-600">Easily calculate your net worth by listing what you own (assets) and what you owe (liabilities).</p>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Assets</h2>
          <p className="mb-4 text-sm text-gray-500">Assets are things you own that have value, such as land, a car, or savings.</p>
          {assets.map((item, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Asset Description"
                value={item.description}
                onChange={(e) => handleChange("asset", idx, "description", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Market Value"
                value={item.value}
                onChange={(e) => handleChange("asset", idx, "value", e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <Button onClick={() => addField("asset")}>+ Add Asset</Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Liabilities</h2>
          <p className="mb-4 text-sm text-gray-500">Liabilities are debts or obligations you owe, such as loans, mortgages, or school fees.</p>
          {liabilities.map((item, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Liability Description"
                value={item.description}
                onChange={(e) => handleChange("liability", idx, "description", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Outstanding Balance"
                value={item.value}
                onChange={(e) => handleChange("liability", idx, "value", e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <Button onClick={() => addField("liability")}>+ Add Liability</Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-100">
        <CardContent className="text-center space-y-2">
          <p className="text-lg">Total Assets: <strong>₦{totalAssets.toLocaleString()}</strong></p>
          <p className="text-lg">Total Liabilities: <strong>₦{totalLiabilities.toLocaleString()}</strong></p>
          <p className="text-xl font-bold">Net Worth: ₦{netWorth.toLocaleString()}</p>
        </CardContent>
      </Card>

      <p className="text-sm text-center mt-8 text-gray-400">Made with ❤️ by Bolawole Adeboye</p>
    </div>
  );
}
