import axios from "axios";
import { useEffect, useState } from "react";

const Cta = () => {
  const [showTable, setShowTable] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [predictedDemand, setPredictedDemand] = useState([]);
  const [data, setData] = useState([])


  // const fetchProduct = async () => {
  //   const response = await axios.get("http://127.0.0.1:8000/predict/April")
  //   console.log(response.data)
  // }
  // useEffect(() => {
  //   fetchProduct()
  // }, [])

  const monthMap = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12",
  };

  const monthOptions = Object.keys(monthMap).map((month) => (
    <option key={month} value={month}>
      {month}
    </option>
  ));

  const handleShowTable = () => {
    setShowTable(!showTable);
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };
  const monthNumber = monthMap[selectedMonth]; // Get the mapped number directly
  console.log(monthNumber)

  const handleFetchPrediction = () => {
    const monthNumber = monthMap[selectedMonth]; // Get the mapped number directly
    console.log(monthNumber)

    // Make the API request with the month number
    axios
      .get(`http://localhost:8000/predict/${selectedMonth}`)
      .then((response) => {
        // Handle the response
        console.log("product for month", response)
        setPredictedDemand(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      });
  };

  const renderTable = () => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Month</th>
          <th>PLU Number</th>
          <th>Item Name</th>
          <th>Prediction</th>
        </tr>
      </thead>
      <tbody>
        {predictedDemand.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.month}</td>
            <td>{product.pluno}</td>
            <td>{product.item_name}</td>
            <td>{product.prediction}</td> {/* Change 'prediction' to the actual key for prediction */}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section
      id="cta"
      className="cta"
      style={{
        background:
          "linear-gradient(rgba(40, 58, 90, 0.9), rgba(40, 58, 90, 0.9)), url(/assets/img/supermarket.jpg) fixed center center",
        backgroundSize: "cover",
        padding: "120px 0",
      }}
    >
      <div className="container" data-aos="zoom-in">
        <div className="row">
          <div className="col-lg-9 text-center text-lg-start">
            <h3>CSD INVENTORY PREDICTION</h3>
            <p>
              Get insights into grocery trends and predictions to optimize stock
              management and customer satisfaction.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="monthSelect" className="form-label">
                Select Month:
              </label>
              <select
                className="form-select"
                id="monthSelect"
                value={selectedMonth}
                onChange={handleChangeMonth}
              >
                <option value="">Select Month</option>
                {monthOptions}
              </select>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleFetchPrediction}
            >
              Fetch Prediction
            </button>
            {predictedDemand.length > 0 && renderTable()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
