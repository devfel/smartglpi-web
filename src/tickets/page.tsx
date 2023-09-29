import { columns } from "./columns";
import { DataTable } from "./data-table";
// import { useState, useEffect } from "react";
//import data from "@/tickets/data.json";

export function DemoPage(data) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

// export function DemoPage() {
//   const [data, setData] = useState<Payment[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await getData();
//       setData(result);
//     }

//     fetchData();
//   }, []); // The empty dependency array means this useEffect will run once when the component mounts.

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }

// // QUERYING DATA FROM BACKEND
// import { useEffect, useState } from "react";
// import { DataTable } from "@/tickets/data-table";
// import { columns } from "@/tickets/columns";

// export function DemoPage() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend and update state
//     async function fetchData() {
//       // Fetch data from your backend
//       // For now, I'm assuming the backend responds with the appropriate JSON
//       const response = await fetch("YOUR_BACKEND_ENDPOINT_URL");
//       const fetchedData = await response.json();
//       setData(fetchedData);
//     }

//     fetchData();
//   }, []);

//   // This will calculate the similarity percentage linearly
//   function calculateSimilarityPercentageLinear(x: number) {
//     // Create the Function
//     const linearAdjustment = 1.33; //increase the results in 33%
//     let remove90PercentAdj = (x - 0.9) * 10 * linearAdjustment; //remove the 0.90  from the backend value
//     if (remove90PercentAdj < 0) remove90PercentAdj = 0; //if the value is negative, set to 0
//     if (remove90PercentAdj > 1) remove90PercentAdj = 1; //if the value is greater than 1, set to 1 (100%
//     return remove90PercentAdj * 100;
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable
//         columns={columns}
//         data={data.map((item) => ({
//           id: item[0]["id"],
//           title: item[0]["title"],
//           similarityPercentage: calculateSimilarityPercentageLinear(
//             item[1]
//           ).toFixed(1),
//           link: `https://sac-ntinf.ufsj.edu.br/front/ticket.form.php?id=${item[0]["id"]}`,
//         }))}
//       />
//     </div>
//   );
// }
