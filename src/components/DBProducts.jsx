import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, addNewProductList, updateAProductList } from "../api";
import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@material-ui/core/Typography";


import { useState, Fragment, useEffect, useLayoutEffect } from "react";
// import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { getAllProductsList, deleteAProductList } from "../api";
import { setAllProductsList } from "../context/actions/productListActions";
const DBProducts = () => {
  const productsList = useSelector((state) => state.productsList);
  const fetchdata = () => {
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
      setData(data);
    });
  };

  const tableColumns = [
    {
      title: "مجموعه",
      field: "category_name",
    },
  ];
  const [data, setData] = useState(productsList);

  const MyNewTitle = ({ text, variant }) => (
    <Typography
      variant={variant}
      style={{
        fontFamily:"IranYekanMedium",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {text}
    </Typography>
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
      setData(data);
    });

    return () => {};
  }, []);

  const defaultMaterialTheme = createTheme({
    direction: "rtl",
  
  });

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full  text-lg   font-meduim">
      <Fragment>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            //    components={{
            //     Toolbar: props => (
            //         <div style={{ backgroundColor: 'red' ,fontFamily:"IranYekanThin",fontSize:"12rem"}}>
            //             <MTableToolbar {...props} />
            //         </div>
            //     )
            // }}
            columns={tableColumns}
            data={data ? data : []}
            title=<MyNewTitle variant="h6" text="جدول مجموعه ها" />
            options={{
              search: true,
              headerStyle: {
                color: "gray",
                fontFamily: "Blackout",
                fontSize: "2rem",
                paddingRight: "20px",
              },
              showTitle: true,

              rowStyle: {
                fontFamily: "IranYekanMedium",
              },

              pagination: { color: "red" },
            }}
      
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    addNewProductList(newData)
                      .then((res) => {
                        fetchdata();
                        console.log(res);
                      })
                      .catch((error) => {
                        console.log(error);
                      });

                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                   
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    updateAProductList(oldData._id, newData).then((res) => {
                    });

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    if (window.confirm("کسرا به چوخ نری!")) {
                      deleteAProductList(oldData._id).then((res) => {
                        getAllProductsList().then((data) => {
                          dispatch(setAllProductsList(data));
                        });
                      });
                    }
                    resolve();
                  }, 1000);
                }),
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "اطاعات موجود نیست",
                addTooltip: "اضافه کردن مجموعه",
                deleteTooltip: "حذف",
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

            // localization={{
            //   body: {
            //     emptyDataSourceMessage: "Pas d'enregistreent à afficher",
            //     addTooltip: "Ajouter",
            //     deleteTooltip: "Supprimer",
            //     editTooltip: "Editer",
            //     filterRow: {
            //       filterTooltip: "Filtrer",
            //     },
            //     editRow: {
            //       deleteText: "مطمئنی؟",
            //       cancelTooltip: "Annuler",
            //       saveTooltip: "Enregistrer",
            //     },
            //   },
            //   grouping: {
            //     placeholder: "Tirer l'entête ...",
            //     groupedBy: "Grouper par:",
            //   },
            //   header: {
            //     actions: "Actions",
            //   },
            //   pagination: {
            //     labelDisplayedRows: "{from}-{to} de {count}",
            //     labelRowsSelect: "lignes",
            //     labelRowsPerPage: "lignes par page:",
            //     firstAriaLabel: "Première page",
            //     firstTooltip: "Première page",
            //     previousAriaLabel: "Page précédente",
            //     previousTooltip: "Page précédente",
            //     nextAriaLabel: "Page suivante",
            //     nextTooltip: "Page suivante",
            //     lastAriaLabel: "Dernière page",
            //     lastTooltip: "Dernière page",
            //   },
            //   toolbar: {
            //     addRemoveColumns: "Ajouter ou supprimer des colonnes",
            //     nRowsSelected: "{0} ligne(s) sélectionée(s)",
            //     showColumnsTitle: "Voir les colonnes",
            //     showColumnsAriaLabel: "Voir les colonnes",
            //     exportTitle: "Exporter",
            //     exportAriaLabel: "Exporter",
            //     exportName: "Exporter en CSV",
            //     searchTooltip: "Chercher",
            //     searchPlaceholder: "Chercher",
            //   },
            // }}
          />
        </ThemeProvider>
      </Fragment>
      {/* <Fragment>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Editable Preview"
            columns=
              {
                title: "category",
                field: "category_name",
              },
            ]}
            data={data ? data : []}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
                    // addNewProductList(newData).then(res=>{
                    //   setData([...data, res]);
                    //   console.log(res)
                    // }).catch(error=>{
                    //   console.log(error)
                    // })

                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve();
                  }, 1000);
                }),
            }}
          />
    
        </ThemeProvider>
      </Fragment> */}
    </div>
  );
};

export default DBProducts;
