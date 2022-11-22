/* eslint-disable max-len */
import type { ReactElement } from 'react';
import React from 'react';

type Props = { className?: string };

const Icon404 = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 120 120"
    className={className}
  >
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
      <g transform="translate(5.000000, 13.000000)">
        <path d="M99.6066207,63.8281379 C98.8005517,68.3268966 97.1801379,72.6022069 94.7586207,76.4074483 C89.5630345,84.7164138 80.0954483,88.9851034 70.5103448,87.2537931 C60.9252414,85.5224828 53.4190345,78.2513103 51.4576552,68.7870345 C51.2275862,67.6317241 50.9975172,66.4797241 50.88,65.3227586 C56.4231724,62.0918621 60.6951724,57.1263448 63.2342069,51.1246897 C63.2441379,51.1329655 63.2871724,51.032 63.3484138,50.8582069 C65.9486897,52.04 69.9823448,52.3991724 74.7062069,47.6537931 L75.1663448,47.1903448 L71.8311724,43.870069 L71.3693793,44.3351724 C69.1895172,46.5249655 67.2215172,47.3111724 65.52,46.6722759 L65.510069,46.6673103 C65.2535172,46.5696552 65.0085517,46.433931 64.7718621,46.2766897 C64.9754483,45.5666207 65.1095172,45.0485517 65.088,45.0121379 C66.0132414,40.2766897 66.0132414,35.4303448 65.2055172,30.6998621 C78.4849655,31.3950345 91.7627586,34.1624828 104.004414,39.0121379 L99.6066207,63.8281379 Z M40.0270345,63.3696552 L40.0270345,63.368 C30.4435862,65.0993103 20.8568276,60.8289655 15.7787586,52.52 C13.3522759,48.5972414 11.7368276,44.4394483 10.9307586,39.9406897 L6.54124138,15.0022069 C21.8995862,8.88468966 38.4132414,5.99972414 54.9202759,6.46482759 L59.3097931,31.2808276 C60.1175172,35.7795862 60.0049655,40.2833103 59.0797241,44.7837241 C57.1183448,54.3638621 49.6104828,61.6383448 40.0270345,63.3696552 L40.0270345,63.3696552 Z M108.501517,34.6772414 L108.384,34.6242759 C94.4093793,28.7368276 79.2877241,25.5092414 64.1577931,24.814069 L60.2184828,3.00055172 C60.1026207,2.30703448 60,1.83365517 59.865931,1.02096552 C59.4587586,0.966344828 58.214069,0.862068966 57.5784828,0.804137931 C38.7542069,-0.116137931 19.5906207,3.23062069 2.15172414,10.616 C1.56744828,10.8493793 0.514758621,11.326069 0,11.6802759 C0.0811034483,12.1950345 0.306206897,13.1086897 0.420413793,13.7343448 L5.15751724,40.8609655 C6.08110345,46.0548966 7.92496552,51.0187586 10.8115862,55.5175172 C16.2388966,64.2932414 25.7064828,69.4871724 35.8692414,69.4871724 C37.6022069,69.4871724 39.3318621,69.3713103 41.0648276,69.0286897 C42.5677241,68.7969655 44.0689655,68.3335172 45.4543448,67.8717241 C45.5718621,68.5668966 45.5718621,69.2571034 45.8002759,69.9506207 C48.2234483,81.9506207 57.5768276,90.9547586 69.4725517,93.0336552 C71.2038621,93.3795862 72.9351724,93.4921379 74.6681379,93.4921379 C84.7133793,93.4921379 94.1793103,88.2982069 99.7241379,79.5224828 C102.493241,75.0237241 104.459586,70.0598621 105.379862,64.865931 L110.11531,37.7409655 C110.237793,37.0689655 110.345379,36.3373793 110.426483,35.7133793 C109.857103,35.3326897 108.994759,34.9056552 108.501517,34.6772414 L108.501517,34.6772414 Z"></path>
        <path d="M35.9293241,22.6136828 C36.5599448,24.5419586 40.5290483,28.1601655 45.1221517,28.2826483 C47.9905655,28.3604414 51.9100138,27.1240276 54.3679448,20.7847172 L54.6029793,20.1739586 L50.2151172,18.4757517 L49.9784276,19.0832 C48.8611862,21.9665103 47.3748414,23.4760276 45.5607724,23.5753379 L45.5491862,23.5753379 C43.0598069,23.701131 40.2327724,20.9055448 40.2046345,20.8757517 L39.9182897,20.5894069 L35.7273931,21.9979586 L35.9293241,22.6136828 Z"></path>
        <path d="M16.488331,25.7897931 L16.0199172,25.3346207 L12.7377103,28.7062069 L13.2061241,29.1613793 C18.0772966,33.9034483 22.1572966,33.3969655 24.7327448,32.1324138 C28.8590897,30.1081379 30.9628138,25.1674483 30.7327448,23.1514483 L30.6599172,22.5092414 L26.2637793,22.9726897 L26.1214345,23.3517241 C26.1081931,23.3897931 24.7012966,27.1089655 22.3857103,28.0308966 C22.3807448,28.0308966 22.3790897,28.0325517 22.3741241,28.0342069 C20.6841931,28.7012414 18.7046069,27.9464828 16.488331,25.7897931"></path>
        <path d="M88.7185655,56.5721931 C93.3100138,56.7079172 97.4777379,53.3181241 98.2159448,51.4295724 L98.4509793,50.8254345 L94.3461517,49.1835034 L94.0449103,49.4532966 C94.0151172,49.4797793 91.0341517,52.1131586 88.5547034,51.848331 C88.5513931,51.848331 88.5480828,51.848331 88.5447724,51.8466759 C86.7389793,51.6464 85.3387034,50.0557793 84.3853241,47.1145379 L84.1850483,46.4938483 L79.7078069,47.9437793 L79.9097379,48.564469 C82.0068414,55.0328828 85.8518069,56.4877793 88.7185655,56.5721931"></path>
        <path d="M45.7819034,49.807669 C43.0078345,46.8449103 39.9888,45.4313931 37.2792828,45.8336 C34.554869,46.2358069 32.1813517,48.4438069 30.426869,52.207669 L30.2928,52.4989793 L25.4696276,50.3704276 L25.6086621,50.0691862 C27.6892138,45.6051862 30.7214897,42.5613241 34.2933517,41.2934621 C34.9934897,41.0451862 35.7134897,40.8664276 36.4533517,40.755531 C37.4216276,40.6131862 38.414731,40.591669 39.402869,40.6926345 C42.9979034,41.0600828 46.5532138,43.0198069 49.6831448,46.3665655 L49.914869,46.611531 L45.9970759,50.0377379 L45.7819034,49.807669 Z"></path>
        <path d="M71.9761655,63.7521655 C68.3629241,63.8514759 64.6718897,65.5414069 61.3003034,68.6448552 L61.0520276,68.873269 L64.7033379,72.5808552 L64.9350621,72.3673379 C67.9209931,69.6197517 71.0393379,68.4346483 73.7107862,69.0354759 C76.3954759,69.641269 78.5985103,72.0180966 80.0683034,75.9044414 L80.1825103,76.2023724 L85.1496828,74.441269 L85.0321655,74.1300966 C83.2909241,69.5220966 80.4936828,66.2630621 77.0260966,64.7320276 C76.3458207,64.4324414 75.6407172,64.1990621 74.9124414,64.0352 C73.9557517,63.8200276 72.969269,63.7240276 71.9761655,63.7521655"></path>
      </g>
    </g>
  </svg>
);

export default Icon404;