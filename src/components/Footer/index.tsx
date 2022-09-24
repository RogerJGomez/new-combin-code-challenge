import React from "react";

const Footer: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full bg-blue-400 h-16 flex items-center justify-center text-white absolute bottom-0">
      <h2 className="uppercase">Copyright - All Rights Reserved</h2>
    </div>
  );
};

export default Footer;
