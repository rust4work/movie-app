import { Input } from "antd";

export default function Search() {
  return (
    <div className="w-8/10">
      <Input
        type="text"
        placeholder="Type to search..."
        size="large"
        width="100%"
      />
    </div>
  );
}
