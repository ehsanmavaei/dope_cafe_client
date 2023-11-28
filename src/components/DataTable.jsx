import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { deleteAProduct, getAllProducts, updateAProduct } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "material-table";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme({
    direction: "rtl",
  });
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        options={{
          headerStyle: {
            color: "gray",
            fontFamily: "Blackout",
            fontSize: "2rem",
            paddingRight: "20px",
          },
          rowStyle: { padding: "20px" },

          pagination: { color: "red" },
        }}
        editable={{
          // onRowAdd: (newData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       // setData([...data, newData]);

          //       resolve();
          //     }, 1000);
          //   }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log("old:", oldData);
                console.log("new:", newData);
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                // setData([...dataUpdate]);
                console.log(newData._id);
                getAllProducts().then((data) => {
                  dispatch(setAllProducts([...dataUpdate]));
                });
                updateAProduct(newData._id, newData).then((res) => {
                  console.log(res);
                });

                resolve();
              }, 1000);
            }),

          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataUpdate = [...data];
          //       const index = oldData.tableData.id;
          //       dataUpdate[index] = newData;
          //     console.log([...dataUpdate])
          //     console.log(dataUpdate)
          //       getAllProducts().then((data) => {
          //         dispatch(setAllProducts([...dataUpdate]));
          //       });

          //       resolve();
          //     }, 1000);

          //   }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       console.log([...dataDelete]);
          //       dataDelete.splice(index, 1);
          //       // setData([...dataDelete]);

          //       resolve();
          //     }, 1000);
          //   }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "اطاعات موجود نیست",
            addTooltip: "Ajouter",
            deleteTooltip: "Supprimer",
            editTooltip: "ویرایش",
            filterRow: {
              filterTooltip: "Filtrer",
            },
            editRow: {
              deleteText: "مطمئنی که میخوای حذف کنی؟",
              cancelTooltip: "کنسل",
              saveTooltip: "تایید",
            },
          },
          grouping: {
            placeholder: "Tirer l'entête ...",
            groupedBy: "Grouper par:",
          },
          header: {
            actions: "عملیات",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} از {count}",
            labelRowsSelect: "ردیف",
            labelRowsPerPage: "ردیف در صفحه:",
            firstAriaLabel: "صفحه اول",
            firstTooltip: "صفحه اول",
            previousAriaLabel: "Page précédente",
            previousTooltip: "صفحه قبلی",
            nextAriaLabel: "صفحه بعدی",
            nextTooltip: "صفحه بعدی",
            lastAriaLabel: "Dernière page",
            lastTooltip: "صفحه آخر",
          },
          toolbar: {
            addRemoveColumns: "Ajouter ou supprimer des colonnes",
            nRowsSelected: "{0} ligne(s) sélectionée(s)",
            showColumnsTitle: "Voir les colonnes",
            showColumnsAriaLabel: "Voir les colonnes",
            exportTitle: "Exporter",
            exportAriaLabel: "Exporter",
            exportName: "Exporter en CSV",
            searchTooltip: "جستجو",
            searchPlaceholder: "جستجو",
          },
        }}
        columns={columns}
        data={data}
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTable;
