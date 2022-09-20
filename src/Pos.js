import React, { Component, Fragment, useState, useReducer } from "react";
import "./Pos.css"

const Pos = () =>{
  let [mp47, getMp47] = useState(45);
  return (
    <Fragment>
      <div className="paper_pricing">
        <h2>Paper prices</h2>
        <table>
          <tr>
            <th>Paper type</th>
            <th>GSM</th>
            <th>Price per sheet</th>
            <th>GST</th>
            <th>Transport wages</th>
            <th>Net</th>
            <th>Margin</th>
            <th>Press</th>
            <th>Margin</th>
            <th>Final customer price</th>
          </tr>
          <tr>
            <td>Maplitho</td>
            <td>47</td>
            <td contenteditable='true'>{mp47}</td>
            <td>12%</td>
            <td>3%</td>
            <td>63.25</td>
            <td>4</td>
            <td>67.25</td>
            <td>7</td>
            <td>70.25</td>
          </tr>
        </table>
      </div>
    </Fragment>
  );
}

// class Pos extends Component {
//   const [mp47, getMp47] = useState(45);
//   render() {
//     return (
//       <Fragment>
//         <div className="paper_pricing">
//           <h2>Paper prices</h2>
//           <table>
//             <tr>
//               <th>Paper type</th>
//               <th>GSM</th>
//               <th>Price per sheet</th>
//               <th>GST</th>
//               <th>Transport wages</th>
//               <th>Net</th>
//               <th>Margin</th>
//               <th>Press</th>
//               <th>Margin</th>
//               <th>Final customer price</th>
//             </tr>
//             <tr>
//               <td>Maplitho</td>
//               <td>47</td>
//               <td contenteditable='true'>55</td>
//               <td>12%</td>
//               <td>3%</td>
//               <td>63.25</td>
//               <td>4</td>
//               <td>67.25</td>
//               <td>7</td>
//               <td>70.25</td>
//             </tr>
//           </table>
//         </div>
//       </Fragment>
//     );
//   }
// }
export default Pos;
// export {getPrice};

