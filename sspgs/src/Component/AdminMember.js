import React, { useEffect, useState } from 'react'
import BootstrapTable from "react-bootstrap-table-next"
import "./Member.css"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CsvDownloader from "react-csv-downloader"
import cellEditFactory from 'react-bootstrap-table2-editor';
import { useNavigate } from "react-router-dom"
import { BiSolidEditAlt } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai";
import { Fade, Zoom } from "react-awesome-reveal"
import axios from "axios";


function Home() {
  const url = "http://localhost:2909/member"
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(0);
  
  const navigate = useNavigate();

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("Page", page)
      console.log("Size per Page", sizePerPage)
    }
  })


  const deleteItem = async (id) => {
    axios.delete("http://localhost:2909/member/" + id).then((res) => {
      if (res.status === 200) {
        setRefresh(Math.random() * 600000000000);
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const columns = [
    {
      dataField: "surname",
      text: "Surname",
      sort: true,
      filter: textFilter()

    }, {
      dataField: "name",
      text: "Name",
      sort: true,
      filter: textFilter()

    }, {
      dataField: "fatherName",
      text: "FatherName",
      sort: true
    }, {
      dataField: "mobileNumber",
      text: "MobileNumber",
      sort: true
    }, {
      dataField: "whatsappNumber",
      text: "WhatsappNumber",
      sort: true
    }, {
      dataField: "edit",
      text: "Edit",
      events: {
        onClick: async (e, column, columnIndex, row, rowIndex) => {
          navigate("/admin/update/" + row._id);
        },
      }
    }, {
      dataField: "delete",
      text: "Delete",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          deleteItem(row._id);
        },
      }
    }
  ]


  const getData = () => {
    fetch(url)
      .then((responce) => responce.json())
      .then((d) => setData(d.map((d) => {
        return {
          ...d,
          edit: <BiSolidEditAlt style={{ color: "blue", cursor: "pointer" }} />,
          delete: <AiFillDelete style={{ color: "red", cursor: "pointer" }} />
        }
      })))
      .catch((error) => console.log(error))
  }


  useEffect(() => {
    getData()
  }, [refresh])

  return (
    <div style={{ backgroundColor: 'purple', color: "white" }}>
      <Fade duration={2000}>
        <h1 style={{ marginTop: 20, marginBottom: 20 }}>Shree Sorathiya Prajapati Gnati Samaj</h1>
      </Fade>

      <BootstrapTable
        bootstrap4
        data={data}
        columns={columns}
        keyField="id"
        striped
        condensed
        tabIndexCell
        pagination={pagination}
        filter={filterFactory()}
      />

      <CsvDownloader style={{ marginBottom: 20, marginTop: 10, backgroundColor: "purple", }}
        datas={data}
        text='Export to CSV'
        filename={`userdata_` + new Date().toLocaleString()}
        extension='.csv'
        className='btn btn-success'
      />

    </div>
  )
}

export default Home

