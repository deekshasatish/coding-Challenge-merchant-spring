import React, { Component } from "react";
import Table from "./TableComponent";
import * as APIDirectory from "../APIDirectory";
import axios from "axios";
import { imageAlbum } from "../imageAlbum";

export class PaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [], //the array of sales from the server side
      isLoading:false,//loader boolean
      rows: [], //structure of row as desired by the table component
    };
    this.headerList = this.getHeaderList(); // the table header array
  }

  componentDidMount() {
    this.fetchPaginatedList(); // to fetch the list needed before the list is rendered
  }

  fetchPaginatedList = async () => {
   this.setState({
      isLoading:true
    })
    let url = APIDirectory.getSales("Pending");
    let salesList = await axios.get(url); // fetching the sales that are pending as we are showing the over due orders
    if (salesList.status === 200) {
      this.setState({
        sales: salesList.data.result,
      });
    }
    let rows = this.getRows();
    if (rows) {
      this.setState({
        rows: rows,
        isLoading:false
      });
    }
  };

  //constructing the header array
  getHeaderList = () => {
    return [
      {
        id: 0,
        label: "MARKET PLACE",
        attributePath: "marketplace",
      },
      {
        id: 1,
        label: "STORE",
        attributePath: "shopName",
      },
      {
        id: 2,
        label: "ORDER ID",
        attributePath: "orderId",
      },

      {
        id: 3,
        label: "OREDR VALUE",
        attributePath: "orderValue",
      },
      {
        id: 4,
        label: "ITEMS",
        attributePath: "items",
      },
      {
        id: 5,
        label: "DESTINATION",
        attributePath: "destination",
      },
      {
        id: 6,
        label: "DAYS OVERDUE",
        attributePath: "daysOverdue",
      },
    ];
  };

  // the method to create data
  createData(
    marketplace,
    shopName,
    orderId,
    orderValue,
    items,
    destination,
    daysOverdue,
    country
  ) {
    return {
      marketplace,
      shopName,
      orderId,
      orderValue,
      items,
      destination,
      daysOverdue,
      country,
    };
  }

  // constructing the row as needed
  getRows = () => {
    let salesArray = this.state.sales;
    let rows = [];
    salesArray.map((sale) => {
      rows.push(
        this.createData(
          sale.marketplace,
          sale.shopName,
          sale.orderId,
          sale.orderValue,
          sale.items,
          sale.destination,
          sale.daysOverdue,
          sale.country
        )
      );
    });
    return rows;
  };

  render() {
    return (
      this.state.isLoading?
      <div
      align='center'
      style={componentStyles.loaderContainer}>
      <img alt="Loading..." src={imageAlbum.spinner} style={{ textDecoration: "none" }} />
    </div>:
      <div
        style={componentStyles.containerStyle}
      >
        <Table
          headCells={this.headerList}
          rows={this.state.rows}
          title="Overdue Orders"
        />
      </div>
    );
  }
}

export default PaginatedList;

const componentStyles={
  containerStyle:{
    margin: "100px 200px 200px",
  },
    loaderContainer:{ 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection:'column'
}
}
