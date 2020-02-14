import React from "react";
import Image from "material-ui-image";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>

      <Image src={require("./work-1.png")} alt="working" />
    </div>
  );
}
