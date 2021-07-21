// import React, {useState, useEffect} from 'react';
// import {useTranslation} from 'react-i18next';

// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardFooter,
//   Spinner,
//   Table,
//   Container,
//   Row,
// } from 'reactstrap';
// // core components
// import Header from '../Headers/Header.js';
// import {useSelector, useDispatch} from 'react-redux';
// import Pagination from '../Pagination/paginate';

// import {listPayments} from '../../redux/actions/payments.actions';
// const Tables = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(15);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   // //redux
//   // const history = useHistory();
//   const {payments, loading, count} = useSelector(
//     (state) => state.paymentsReducer,
//   );

//   // const navigateTo = (route) => history.push(route);

//   const dispatch = useDispatch();

//   const {t} = useTranslation();

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     dispatch(listPayments(postsPerPage, currentPage, searchKeyword));

//     // eslint-disable-next-line
//   }, [dispatch, currentPage, postsPerPage, searchKeyword]);
//   return (
//     <>
//       ,
//       <Header cardsVisible={false} />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         {/* Table */}
//         <Row>
//           <div className="col">
//             <Card className="table-shadow">
//               <CardHeader className="border-0 table-custom-header">
//                 <div className="table-header-actions">
//                   <input
//                     placeholder={t('search')}
//                     className="table-header-input"
//                     type={'text'}
//                     value={searchKeyword}
//                     onChange={(e) => {
//                       setCurrentPage(1);
//                       setSearchKeyword(e.target.value);
//                     }}
//                   />
//                   {loading && (
//                     <div className="table-loader">
//                       <Spinner color={'info'} />
//                     </div>
//                   )}
//                 </div>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light thead-custom">
//                   <tr>
//                     <th scope="col">{t('transactionId')}</th>
//                     <th scope="col">{t('paymentDate')}</th>
//                     <th scope="col">{t('userName')}</th>
//                     <th scope="col">{t('amount')}</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {!loading && payments?.length === 0 ? (
//                     <tr>
//                       <td rowSpan={6} colSpan={6}>
//                         {' '}
//                         No data found
//                       </td>
//                     </tr>
//                   ) : (
//                     <>
//                       {payments?.map((item) => (
//                         <tr key={item?._id}>
//                           <td>{item?.transactionId}</td>

//                           <td>{item?.createdAt}</td>

//                           <td>{item?.user}</td>

//                           <td>{item?.amount}</td>
//                         </tr>
//                       ))}
//                     </>
//                   )}
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
//                 {count > postsPerPage && (
//                   <Pagination
//                     postsPerPage={postsPerPage}
//                     totalPosts={count}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     paginate={paginate}
//                   />
//                 )}
//               </CardFooter>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Tables;

import React from 'react';

const PaymentsTable = () => {
  return <div>uncomment this component at components/tables/PaymentsTable</div>;
};

export default PaymentsTable;
