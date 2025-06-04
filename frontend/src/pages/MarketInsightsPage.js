import { useState } from 'react'
// import './App.css';

// Apex Chart
import Chart from "react-apexcharts";

// React Icons
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";

// Map styling
import { MapContainer, TileLayer, Marker, Popup,Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

import tempImg from 'src/assets/images/temp-map.png'


const TableData = () => {


 




  const data = [
    { products: "Onion", price: "CFA 1375", $Price: "$2.20", arrow: true },
    { products: "Tomato", price: "CFA 1125", $Price: "$1.80", arrow: false },
    { products: "Potato", price: "CFA 940", $Price: "$1.50", arrow: true },
    { products: "Carrot", price: "CFA 815", $Price: "$1.30", arrow: false },
    { products: "Lettuce", price: "CFA 1065", $Price: "$1.70", arrow: true }
  ]

  return (
    <div style={{ margin: "20px", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
      <thead>
        <tr style={{ backgroundColor: "#f5f5f5" }}>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Product</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price</th>
          <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price ($)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr
            key={key}
            style={{
              backgroundColor: key % 2 === 0 ? "#fff" : "#f9f9f9",
              borderBottom: "1px solid #ddd",
            }}
          >
            <td style={{ padding: "10px" }}>{item.products}</td>
            <td style={{ padding: "10px" }}>{item.price}</td>
            <td style={{ padding: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
              {item.$Price}
              {item.arrow ? (
                <FaArrowUp style={{ color: "#039855" }} />
              ) : (
                <FaArrowDown style={{ color: "#D92D20" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

//const SelectOptions = () => {
//
//  return (
//    <>
//      <select name='crops' style={{ padding: "6px 16px", marginRight: "7px" }}>
//        <option value="Select">Select</option>
//        <option value="Okro">Okro</option>
//        <option value="Potato">Potato</option>
//        <option value="Carrot">Carrot</option>
//      </select>
//    </>
//  )
//}

//const Arrangement = () => {
//
//  return (
//    <div style={{ background: "#FAF2F2", display: "flex", width: "240px", alignItems: "center", padding: "1px 2px" }}>
//      <p style={{ background: "#FFFFFF", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Daily</p>
//      <p style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Weekly</p>
//      <p style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>Monthly</p>
//    </div>
//  )
//}

export default function MarketInsightsPage() {
  // const [count, setCount] = useState(0)

  const [options1, setOptions1] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["Onion", "Tomato","Potato", "Carrot", "Lettuce"]
    },
    plotOptions: {
      bar: {
        borderRadius: 5, // Adds a slight curve to the top corners
        horizontal: false, // Ensures the bars are vertical
        columnWidth:"50%"
      },
    },
    dataLabels:{
      enabled:false
    },
    colors:['#0A6054']
  });





  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ["Onion", "Tomato","Potato", "Carrot", "Lettuce"]
    },
    colors:['#0A6054']
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [45, 71, 45, 50, 40, ]
    }
  ])

  const today = new Date();
  const format = { month: "short", day: "2-digit" };

  const cropPriceComparisonCategories = ["Feb 18", "Feb 19", "Feb 20", "Feb 21", "Feb 22", "Feb 23"];

  for (let i = cropPriceComparisonCategories.length - 1; i >= 0; i--) {
    cropPriceComparisonCategories[i] = today.toLocaleDateString("en-US", format);
    today.setDate(today.getDate() - 1);
  }


  const [optionsMarket, setOptionsMarket] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
           new Date(new Date().setDate(new Date().getDate()-3 )).toLocaleDateString("en-US", format), 
            new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
            new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format)
          ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#FFD700", "#FF4500", "#008000"], // Yellow, Red, Green
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesMarket, setSeriesMarket] = useState([
    {
      name: "Local Price",
      data: [28, 24, 34, 45], // Slight variance around 30
    },
    {
      name: "Landing Price",
      data: [29, 34, 30, 44], // Slight upward trend
    },
    {
      name: "Market Price",
      data: [22, 30, 45, 50], // Starting lower but straddles around 30
    },
  ]);




  const [optionsPredictive, setOptionsPredictive] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+4 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+5 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#FFD700"], // Yellow
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: true, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesPredictive, setSeriesPredictive] = useState([
    {
      name: "Local Price",
      data: [28, 24, 34, 45], // Slight variance around 30
    },

  ]);



  const [optionsCropPrice, setOptionsCropPrice] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      }
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: ["#800080", "#FF4500"], // Purple, Red
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });

  const [seriesCropPrice, setSeriesCropPrice] = useState([
    {
      name: "Onion",
      data: [28, 44, 64], // Slight variance around 30
    },
    {
      name: "Tomato",
      data: [32, 50, 70], // Slight upward trend
    },

  ]);



  const [optionsRegion, setOptionsRegion] = useState({
    chart: {
      id: "line-chart",
      toolbar: {
        show: false, // Hides the toolbar with zoom/panning options
      },
    },

    xaxis: {
      categories:[
        new Date(new Date().setDate(new Date().getDate()-2 )).toLocaleDateString("en-US", format), 
         new Date(new Date().setDate(new Date().getDate()-1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate() )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+1 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+2 )).toLocaleDateString("en-US", format),
         new Date(new Date().setDate(new Date().getDate()+3 )).toLocaleDateString("en-US", format)
       ],
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6, // Controls increments (60/6 = 10)
    },
    stroke: {
      curve: "smooth", // Smoothens the lines
      width: 2, // Thin lines
    },
    colors: [ "#008000","#FFD700"], // Yellow, Red, Green
    markers: {
      size: 0, // Hides the points on the line
    },
    legend: {
      show: false, // Hides the legend
    },
    dataLabels: {
      enabled: false, // Disables data labels
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      xaxis: {
        lines: {
          show: false, // Hides vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Shows horizontal grid lines
        },
      },
    },
  });


  const [seriesRegion, setSeriesRegion] = useState([
    {
      name: "Thies Region",
      data: [8, 24, 44], // Slight variance around 30
    },
    {
      name: "Kolda Region",
      data: [12, 30, 50], // Slight upward trend
    },

  ]);


  const center = [13.1383064, -14.1242743];

  // Marker positions
  const marker1 = [13.1373064, -14.1342743];
  const marker2 = [13.1393064, -14.1442743];
  const marker3 = [13.1993064, -14.1542743];
  const marker4 = [13.1493064, -14.1642743];
  const marker5 = [13.1733064, -14.1152743];
  const marker6 = [13.1093064, -14.1842743];
  const marker7 = [13.1593064, -14.1942743];

 //const marker1 = [13.273064, -14.942743];
 // const marker2 = [12.9383064, -13.0242743];



  return (
    <>

      <div style={{ background: "#F5F5F5",padding:"2rem",margin:"0 auto",display:"flex",flexDirection:"column",gap:"3rem",marginTop:"-1rem" }}>
        <div style={{paddingLeft:"8rem",fontSize:"0.7rem",fontWeight:"400"}}> <h1>Crop Price Trends</h1> </div>

        <div style={{ display: "flex",justifyContent:"center"}}>
          <div style={{ marginRight: "16px", flex: 1,backgroundColor:"#FFF",borderRadius:"0.5rem",display:"flex",flexDirection:"column",gap:"10px",paddingLeft:"2rem",paddingTop:"1rem",maxWidth:"30rem" }}>
            <h2 style={{fontWeight:"400",fontSize:"0.7rem"}}>Crop Harvest (Tons)</h2>

            <div>
              {/*<SelectOptions />
              <SelectOptions />*/}
            </div>

            <div style={{display:"flex",justifyContent:"center",position:"relative",left:"-2rem"}}>
              <Chart
                options={ options1 }
                series={ series }
                type="bar"
                width="140%"
              />
            </div>
          </div>

          <div style={{ flex: 1,backgroundColor:"#FFF",borderRadius:"0.5rem",display:"flex",flexDirection:"column",gap:"10px",paddingLeft:"5rem",paddingTop:"1rem",maxWidth:"30rem",maxHeight:"30rem" }}>
            <h2 style={{fontWeight:"400",position:"relative",left:"-1.5rem",fontSize:"0.7rem"}}>Crop Density</h2>
            <div>



             {/* <MapContainer
                center={[13.138, -14.124]} // Latitude and longitude for the map center
                zoom={11}
                style={{ height: "320px", width: "450px",position:"relative",top:"-1.5rem",left:"-4rem",borderRadius:"1rem" }}
                className="leaflet-container"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[13.138, -14.124]}>
                  <Popup>A simple popup!</Popup>
                </Marker>
            </MapContainer>*/}



    {/* DO NOT DELETE THE MAP IN THIS COMMENT
     <div
      style={{
        textDecoration: 'none',
        overflow: 'hidden',
        maxWidth: '100%',
        width: '400px',
        height: '350px',
        borderRadius:"1.3rem",
        borderBottomRadius:"1.3rem",
        position:"relative",
        left:"-2.5rem",
        backgroundColor:"pink",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:"2rem",
      }}
    >
      <div
        id="canvas-for-googlemap"
        style={{
          height: '100%',
          width: '100%',
          maxWidth: '100%',

        }}
      >
        <iframe
          style={{
            height: '100%',
            width: '100%',
            border: 0,
          }}
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?q=+13.1383064,-14.1242743&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
          allowFullScreen
        ></iframe>
      </div>
        </div>*/}

        { <div style={{
          position:"relative",
          left:"-2.5rem",
          top:"-0.8rem",
          scale:"0.95",
          opacity:"0"

        }}>
          <img src={tempImg} alt=""/>
      </div>}



          <MapContainer
               center={center}
               zoom={12}
               style={{ height: "24rem", width: "100%",position:"relative",top:"-23.5rem",left:"-2rem" }}
             >
               {/* TileLayer for map rendering */}
               <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url="https://www.google.com/maps/embed/v1/place?q=+13.1383064,-14.1242743&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                 //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               />

               {/* Circle Marker 1 */}
               <Circle
                 center={marker1}
                 radius={100} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1 }}
               />

               {/* Circle Marker 2 */}
               <Circle
                 center={marker2}
                 radius={200} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />

                {/* Circle Marker 3 */}
                <Circle
                 center={marker3}
                 radius={600} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />


                {/* Circle Marker 4 */}
                <Circle
                 center={marker4}
                 radius={400} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />


                {/* Circle Marker 5 */}
                <Circle
                 center={marker5}
                 radius={2000} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />


                {/* Circle Marker 6 */}
                <Circle
                 center={marker6}
                 radius={300} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />


                {/* Circle Marker 6 */}
                <Circle
                 center={marker6}
                 radius={500} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />

                {/* Circle Marker 7 */}
                <Circle
                 center={marker7}
                 radius={800} // Radius in meters
                 pathOptions={{ color: "red",fillColor: "red", fillOpacity: 1  }}
               />
             </MapContainer>



            </div>
          </div>
        </div>

        <div style={{ display: "flex",justifyContent:"center", gap:"1rem"}}>

          <div style={{ flex: 1,display:"flex",flexDirection:"column",gap:"10px",paddingLeft:"2rem",paddingTop:"1rem",maxWidth:"30rem",backgroundColor:"#FFF",borderRadius:"0.5rem"}}>
            <h2  style={{fontWeight:"700",fontSize:"1.2rem"}}>Price Change</h2>

            {/*<Arrangement />*/}

            <div style={{position:"relative",left:"-2rem",top:"-1.5rem"}}>
              <TableData />
            </div>
          </div>

          <div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingLeft: "4rem",
    paddingTop: "1rem",
    maxWidth: "30rem",
    backgroundColor: "#FFF",
    borderRadius: "0.5rem",
  }}
>
  <h2 style={{ fontWeight: 700 ,fontSize:"1.2rem"}}>Market Comparison & Trends</h2>

  <div style={{ marginBottom: "1rem" }}>
    <select
      style={{
        padding: "8px",
        borderRadius: "0.25rem",
        border: "1px solid #ccc",
        fontSize: "1rem",
      }}
    >
      <option value="">Select Product</option>
      <option value="onion">Onion</option>
      <option value="tomato">Tomato</option>
      <option value="potato">Potato</option>
      <option value="carrot">Carrot</option>
      <option value="lettuce">Lettuce</option>
    </select>
  </div>

  <div style={{ position: "relative", left: "-3rem", top: "1.5rem",paddingBottom:"10px" }}>
    <Chart options={optionsMarket} series={seriesMarket} type="line" width="100%" />
  </div>
</div>

        </div>

        <div
  style={{
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: "0.5rem",
    flexDirection: "column",
    gap: "10px",
    paddingTop: "1rem",
    paddingLeft: "3rem",
    maxWidth: "62rem",
    width: "96%",
  }}
>
  <h2 style={{ fontWeight: "700",fontSize:"1.2rem" }}>Predictive Analytics</h2>

  <div style={{ marginBottom: "1rem", width: "90%" }}>
  <label
    htmlFor="crop-select"
    style={{
      display: "block", // Ensures the label is on top
      fontWeight: "500",
      marginBottom: "0.5rem", // Adds spacing between the label and dropdown
      fontSize: "1rem",
      color: "#4F4F4F", // Adjust the color to match your design
    }}
  >
    Select Crop
  </label>
  <select
    id="crop-select"
    style={{
      width: "50%", // Dropdown stretches fully to its container
      padding: "0.75rem", // Slightly increased padding for better appearance
      border: "1px solid #ccc",
      borderRadius: "0.375rem", // Rounded edges
      fontSize: "1rem",
      backgroundColor: "#F9F9F9", // Matches background
      color: "#4F4F4F", // Text color
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adds subtle elevation
    }}
  >
    <option value="">Select</option>
    <option value="onion">Onion</option>
    <option value="tomato">Tomato</option>
    <option value="potato">Potato</option>
    <option value="carrot">Carrot</option>
    <option value="lettuce">Lettuce</option>
  </select>
</div>

  <Chart
    options={optionsPredictive}
    series={seriesPredictive}
    type="line"
    width="100%"
    height="450"
  />
</div>

<div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
  <div
    style={{
      flex: 1,
      backgroundColor: "#FFF",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      paddingLeft: "2rem",
      paddingTop: "1rem",
      maxWidth: "30rem",
    }}
  >
    <h2 style={{ fontWeight: "700",fontSize:"1.2rem" }}>Crop Price Comparison</h2>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >    <select
      style={{
        width:"50%",
        padding: "10px",
        borderRadius: "0.375rem",
        border: "1px solid #E0E0E0",
        fontSize: "1rem",
        color: "#4F4F4F",
        backgroundColor: "#F9F9F9",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
        <option value="" disabled selected>
          Select Crop
        </option>
        <option value="onion">Onion</option>
        <option value="tomato">Tomato</option>
        <option value="potato">Potato</option>
        <option value="carrot">Carrot</option>
        <option value="lettuce">Lettuce</option>
      </select>

      {/* Second Dropdown */}
      <select
        style={{
          width: "50%",
          padding: "10px",
          borderRadius: "0.375rem",
          border: "1px solid #E0E0E0",
          fontSize: "1rem",
          color: "#4F4F4F",
          backgroundColor: "#F9F9F9",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <option value="" disabled selected>
          Select Crop
        </option>
        <option value="onion">Onion</option>
        <option value="tomato">Tomato</option>
        <option value="potato">Potato</option>
        <option value="carrot">Carrot</option>
        <option value="lettuce">Lettuce</option>
      </select>
    </div>

    <div>
      <Chart
        options={optionsCropPrice}
        series={seriesCropPrice}
        type="line"
        width="100%"
      />
    </div>
  </div>



  <div
  style={{
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem",
    maxWidth: "30rem",
  }}
>
  <h2 style={{ fontWeight: 700, marginBottom: "1rem",fontSize:"1.2rem" }}>Region Comparison</h2>

  {/* Dropdowns Section */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
    }}
  >
    <select
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "0.375rem",
        border: "1px solid #E0E0E0",
        fontSize: "1rem",
        color: "#4F4F4F",
        backgroundColor: "#F9F9F9",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <option value="" disabled selected>
        Select
      </option>
      <option value="thies">Thies</option>
      <option value="kolda">Kolda</option>
    </select>

    <select
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "0.375rem",
        border: "1px solid #E0E0E0",
        fontSize: "1rem",
        color: "#4F4F4F",
        backgroundColor: "#F9F9F9",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <option value="" disabled selected>
        Select
      </option>
      <option value="thies">Thies</option>
      <option value="kolda">Kolda</option>
    </select>
  </div>

  {/* Chart Section */}
  <div>
    <Chart options={optionsRegion} series={seriesRegion} type="line" width="100%" />
  </div>
</div>



        </div>

      </div>

    </>
  )
}
