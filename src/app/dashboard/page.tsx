import CardHeader from '@/components/CardHeader';
import NavTab from '@/components/NavTab';
import styles from '@/styles/dashboard.module.scss';
import { routesNavtab, tableLatestBooking, tableReservation } from '@/utils/dashboardData';
import Image from 'next/image';

const Dashboad = () => {
  return (
    <main className={styles.main_container}>
      <CardHeader title='Reservation Overview' btnText='See all reservation' />
      <div className={styles.card}>
        <NavTab routes={routesNavtab} defaultActiveRoute='Departure'>
          <div className={styles.table_container}>
            <table className={styles.table}>
              <tbody>
                {tableReservation.map((rowData) => (
                  <tr key={rowData.id} className={styles.table_row}>
                    <td className={styles.table_data}>
                      <div className={styles.card_info}>
                        <div className={styles.image_wrapper}>
                          <Image
                            src={rowData.imageSrc}
                            alt='Logo'
                            width={200}
                            height={200}
                            className={styles.image}
                            priority
                          />
                        </div>
                        <div className={styles.text_wrapper}>
                          <h3 className={styles.title}>{rowData.title}</h3>
                          <div className={styles.text_inner}>
                            <p className={styles.paragraph}>{rowData.code}</p>
                            <p className={styles.paragraph}>
                              <i className={`fi fi-rr-moon ${styles.icon}`}></i> {rowData.nights} Nights
                            </p>
                            <p className={styles.paragraph}>
                              <i className={`fi fi-rr-door-closed ${styles.icon}`}></i> {rowData.bedrooms} Bedrooms
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.table_data}>
                      <div className={styles.card_date}>
                        <p className={styles.date}>{rowData.date}</p>
                        <div className={styles.date_inner}>
                          <p className={styles.paragraph}>
                            <i className={`fi fi-br-calendar ${styles.icon}`}></i> {rowData.dateRange}
                          </p>
                          <p className={styles.paragraph}>Arrival : {rowData.arrivalTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.table_data}>
                      <div className={styles.card_price_action}>
                        <div className={styles.card_price}>
                          <p className={styles.price}>$ {rowData.price.toFixed(2)}</p>
                        </div>
                        <div className={styles.card_action}>
                          <button className={styles.button}>Detail Order</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NavTab>
      </div>
      <CardHeader title='Lates Booking' btnText='See all reservation' />
      <div className={styles.card}>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <tbody>
              {tableLatestBooking.map((rowData) => (
                <tr key={rowData.id} className={styles.table_row}>
                  <td className={styles.table_data}>
                    <div className={styles.card_info}>
                      <div className={styles.image_wrapper}>
                        <Image
                          src={rowData.imageSrc}
                          alt='Logo'
                          width={200}
                          height={200}
                          className={styles.image}
                          priority
                        />
                      </div>
                      <div className={styles.text_wrapper}>
                        <h3 className={styles.title}>{rowData.title}</h3>
                        <div className={styles.text_inner}>
                          <p className={styles.paragraph}>
                            <i className={`fi fi-rr-moon ${styles.icon}`}></i> {rowData.nights} Nights
                          </p>
                          <p className={styles.paragraph}>
                            <i className={`fi fi-rr-door-closed ${styles.icon}`}></i> {rowData.bedrooms} Bedrooms
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.table_data}>
                    <div className={styles.card_calendar}>
                      <div className={styles.calendar}>
                        <p className={styles.text}>Check-out</p>
                        <p className={styles.paragraph}>
                          <i className={`fi fi-br-calendar ${styles.icon}`}></i> {rowData.checkInDate}
                        </p>
                      </div>
                      <div className={styles.calendar}>
                        <p className={styles.text}>Check-out</p>
                        <p className={styles.paragraph}>
                          <i className={`fi fi-br-calendar ${styles.icon}`}></i> {rowData.checkOutDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.table_data}>
                    <div className={styles.card_status_action}>
                      <div className={styles.card_status}>
                        <p className={styles.status}>Status</p>
                        <p className={styles.badge}>{rowData.status}</p>
                      </div>
                      <div className={styles.card_action}>
                        <button className={styles.button}>See Reservation</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboad;
