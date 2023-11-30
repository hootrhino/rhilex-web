import { Scatter } from "@ant-design/plots";

const data = [
  {"_ - rank":"624","_ - code":"51-4033","prob":"0.95","Average annual wage":"34920","education":"High school diploma or equivalent","occupation":"Grinding, Lapping, Polishing and Buffing Machine Tool Setters, Operators and Tenders, Metal and Plastic","short occupation":"Tool setters, operators and tenders","len":"35","probability":"0.95","numbEmployed":"74600","median_ann_wage":"32890","employed_may2016":"74600","average_ann_wage":"34920"},
  {"_ - rank":"517","_ - code":"51-9012","prob":"0.88","Average annual wage":"41450","education":"High school diploma or equivalent","occupation":"Separating, Filtering, Clarifying, Precipitating and Still Machine Setters, Operators and Tenders","short occupation":"Tool setters, operators and tenders","len":"35","probability":"0.88","numbEmployed":"47160","median_ann_wage":"38360","employed_may2016":"47160","average_ann_wage":"41450"},
  {"_ - rank":"484","_ - code":"41-4012","prob":"0.85","Average annual wage":"68410","education":"High school diploma or equivalent","occupation":"Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products","short occupation":"Sales Representatives, Wholesale and Manufacturing","len":"92","probability":"0.85","numbEmployed":"404050","median_ann_wage":"57140","employed_may2016":"1404050","average_ann_wage":"68410"},
  {"_ - rank":"105","_ - code":"53-1031","prob":"0.029","Average annual wage":"59800","education":"High school diploma or equivalent","occupation":"First-Line Supervisors of Transportation and Material-Moving Machine and Vehicle Operators","short occupation":"Supervisors Transportation","len":"26","probability":"0.029","numbEmployed":"202760","median_ann_wage":"57270","employed_may2016":"202760","average_ann_wage":"59800"},
  {"_ - rank":"620","_ - code":"51-4072","prob":"0.95","Average annual wage":"32660","education":"High school diploma or equivalent","occupation":"Molding, Coremaking and Casting Machine Setters, Operators and Tenders, Metal and Plastic","short occupation":"Molding, Coremaking and Casting Machine Setters, Operators and Tenders, Metal and Plastic","len":"89","probability":"0.95","numbEmployed":"145560","median_ann_wage":"30480","employed_may2016":"145560","average_ann_wage":"32660"},
  {"_ - rank":"518","_ - code":"51-6091","prob":"0.88","Average annual wage":"35420","education":"High school diploma or equivalent","occupation":"Extruding and Forming Machine Setters, Operators and Tenders, Synthetic and Glass Fibers","short occupation":"Extruding and Forming Machine Setters, Operators and Tenders, Synthetic and Glass Fibers","len":"88","probability":"0.88","numbEmployed":"19340","median_ann_wage":"34240","employed_may2016":"19340","average_ann_wage":"35420"},
  {"_ - rank":"427","_ - code":"51-4031","prob":"0.78","Average annual wage":"34210","education":"High school diploma or equivalent","occupation":"Cutting, Punching and Press Machine Setters, Operators and Tenders, Metal and Plastic","short occupation":"Cutting, Punching and Press Machine Setters, Operators and Tenders, Metal and Plastic","len":"85","probability":"0.78","numbEmployed":"192800","median_ann_wage":"32370","employed_may2016":"192800","average_ann_wage":"34210"},
  {"_ - rank":"228","_ - code":"41-4011","prob":"0.25","Average annual wage":"92910","education":"Bachelor's degree","occupation":"Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products","short occupation":"Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products","len":"85","probability":"0.25","numbEmployed":"328370","median_ann_wage":"78980","employed_may2016":"328370","average_ann_wage":"92910"},
  {"_ - rank":"590","_ - code":"51-4032","prob":"0.94","Average annual wage":"38880","education":"High school diploma or equivalent","occupation":"Drilling and Boring Machine Tool Setters, Operators and Tenders, Metal and Plastic","short occupation":"Drilling and Boring Machine Tool Setters, Operators and Tenders, Metal and Plastic","len":"82","probability":"0.94","numbEmployed":"12290","median_ann_wage":"36410","employed_may2016":"12290","average_ann_wage":"38880"},
  {"_ - rank":"584","_ - code":"51-9041","prob":"0.93","Average annual wage":"34370","education":"High school diploma or equivalent","occupation":"Extruding, Forming, Pressing and Compacting Machine Setters, Operators and Tenders","short occupation":"Extruding, Forming, Pressing and Compacting Machine Setters, Operators and Tenders","len":"82","probability":"0.93","numbEmployed":"71260","median_ann_wage":"32510","employed_may2016":"71260","average_ann_wage":"34370"},
  {"_ - rank":"477","_ - code":"51-4034","prob":"0.84","Average annual wage":"39630","education":"High school diploma or equivalent","occupation":"Lathe and Turning Machine Tool Setters, Operators and Tenders, Metal and Plastic","short occupation":"Lathe and Turning Machine Tool Setters, Operators and Tenders, Metal and Plastic","len":"80","probability":"0.84","numbEmployed":"33850","median_ann_wage":"38480","employed_may2016":"33850","average_ann_wage":"39630"},
  {"_ - rank":"560","_ - code":"51-4021","prob":"0.91","Average annual wage":"35340","education":"High school diploma or equivalent","occupation":"Extruding and Drawing Machine Setters, Operators and Tenders, Metal and Plastic","short occupation":"Extruding and Drawing Machine Setters, Operators and Tenders, Metal and Plastic","len":"79","probability":"0.91","numbEmployed":"71960","median_ann_wage":"33870","employed_may2016":"71960","average_ann_wage":"35340"},
  {"_ - rank":"637","_ - code":"51-6064","prob":"0.96","Average annual wage":"28110","education":"High school diploma or equivalent","occupation":"TextileWinding, Twisting and Drawing Out Machine Setters, Operators and Tenders","short occupation":"TextileWinding, Twisting and Drawing Out Machine Setters, Operators and Tenders","len":"79","probability":"0.96","numbEmployed":"30340","median_ann_wage":"27500","employed_may2016":"30340","average_ann_wage":"28110"},
  {"_ - rank":"323","_ - code":"37-1012","prob":"0.57","Average annual wage":"48790","education":"High school diploma or equivalent","occupation":"First-Line Supervisors of Landscaping, Lawn Service and Groundskeeping Workers","short occupation":"Supervisors Groundskeeping","len":"26","probability":"0.57","numbEmployed":"503070","median_ann_wage":"45740","employed_may2016":"103070","average_ann_wage":"48790"},
  {"_ - rank":"634","_ - code":"43-6014","prob":"0.96","Average annual wage":"36140","education":"High school diploma or equivalent","occupation":"Secretaries and Administrative Assistants, Except Legal, Medical and Executive","short occupation":"Secretaries and Administrative Assistants","len":"41","probability":"0.96","numbEmployed":"2295510","median_ann_wage":"34820","employed_may2016":"2295510","average_ann_wage":"36140"},
  {"_ - rank":"554","_ - code":"49-2093","prob":"0.91","Average annual wage":"59840","education":"Postsecondary nondegree award","occupation":"Electrical and Electronics Installers and Repairers, Transportation Equipment","short occupation":"Electrical and Electronics Installers and Repairers, Transportation Equipment","len":"77","probability":"0.91","numbEmployed":"13960","median_ann_wage":"59280","employed_may2016":"13960","average_ann_wage":"59840"},
  {"_ - rank":"208","_ - code":"15-1179","prob":"0.21","Average annual wage":"67770","education":"Associate's degree","occupation":"Information Security Analysts, Web Developers and Computer Network Architects","short occupation":"Information Security Analysts, Web Developers and Computer Network Architects","len":"77","probability":"0.21","numbEmployed":"188740","median_ann_wage":"62670","employed_may2016":"188740","average_ann_wage":"67770"},
  {"_ - rank":"678","_ - code":"51-4035","prob":"0.98","Average annual wage":"41180","education":"High school diploma or equivalent","occupation":"Milling and Planing Machine Setters, Operators and Tenders, Metal and Plastic","short occupation":"Milling and Planing Machine Setters, Operators and Tenders, Metal and Plastic","len":"77","probability":"0.98","numbEmployed":"17560","median_ann_wage":"39840","employed_may2016":"17560","average_ann_wage":"41180"},
  {"_ - rank":"569","_ - code":"51-4193","prob":"0.92","Average annual wage":"33690","education":"High school diploma or equivalent","occupation":"Plating and Coating Machine Setters, Operators and Tenders, Metal and Plastic","short occupation":"Plating and Coating Machine Setters, Operators and Tenders, Metal and Plastic","len":"77","probability":"0.92","numbEmployed":"35570","median_ann_wage":"31280","employed_may2016":"35570","average_ann_wage":"33690"},
  {"_ - rank":"254","_ - code":"49-2022","prob":"0.36","Average annual wage":"54520","education":"Postsecondary nondegree award","occupation":"Telecommunications Equipment Installers and Repairers, Except Line Installers","short occupation":"Telecommunications Equipment Installers and Repairers","len":"77","probability":"0.36","numbEmployed":"228430","median_ann_wage":"53640","employed_may2016":"228430","average_ann_wage":"54520"},
  {"_ - rank":"253","_ - code":"51-4012","prob":"0.36","Average annual wage":"53560","education":"High school diploma or equivalent","occupation":"Computer Numerically Controlled Machine Tool Programmers, Metal and Plastic","short occupation":"Computer Numerically Controlled Machine Tool Programmers, Metal and Plastic","len":"75","probability":"0.36","numbEmployed":"25180","median_ann_wage":"50580","employed_may2016":"25180","average_ann_wage":"53560"},
  {"_ - rank":"548","_ - code":"51-3091","prob":"0.91","Average annual wage":"30970","education":"No formal educational credential","occupation":"Food and Tobacco Roasting, Baking and Drying Machine Operators and Tenders","short occupation":"Food and Tobacco Roasting, Baking and Drying Machine Operators and Tenders","len":"74","probability":"0.91","numbEmployed":"20080","median_ann_wage":"28570","employed_may2016":"20080","average_ann_wage":"30970"},
  {"_ - rank":"103","_ - code":"17-2111","prob":"0.028","Average annual wage":"90190","education":"Bachelor's degree","occupation":"Health and Safety Engineers, Except Mining Safety Engineers and Inspectors","short occupation":"Health and Safety Engineers","len":"74","probability":"0.028","numbEmployed":"25410","median_ann_wage":"86720","employed_may2016":"25410","average_ann_wage":"90190"},
  {"_ - rank":"205","_ - code":"25-3011","prob":"0.19","Average annual wage":"55140","education":"Bachelor's degree","occupation":"Adult Basic and Secondary Education and Literacy Teachers and Instructors","short occupation":"Adult Basic and Secondary Education and Literacy Teachers and Instructors","len":"73","probability":"0.19","numbEmployed":"58810","median_ann_wage":"50650","employed_may2016":"58810","average_ann_wage":"55140"},
  {"_ - rank":"277","_ - code":"49-2094","prob":"0.41","Average annual wage":"56990","education":"Postsecondary nondegree award","occupation":"Electrical and Electronics Repairers, Commercial and Industrial Equipment","short occupation":"Electrical and Electronics Repairers, Commercial and Industrial Equipment","len":"73","probability":"0.41","numbEmployed":"67390","median_ann_wage":"56250","employed_may2016":"67390","average_ann_wage":"56990"},
  {"_ - rank":"556","_ - code":"51-4191","prob":"0.91","Average annual wage":"39010","education":"High school diploma or equivalent","occupation":"Heat Treating Equipment Setters, Operators and Tenders, Metal and Plastic","short occupation":"Heat Treating Equipment Setters, Operators and Tenders, Metal and Plastic","len":"73","probability":"0.91","numbEmployed":"19780","median_ann_wage":"37180","employed_may2016":"19780","average_ann_wage":"39010"},
];

const Point2 = () => {
  const processData = data.map((item) => {
    item['Average annual wage'] = item['Average annual wage'] * 1;
    item['probability'] = item['probability'] * 1;
    item['numbEmployed'] = item['numbEmployed'] * 1;
    return item;
  });

  const config = {
    appendPadding: 30,
    data: processData,
    xField: 'probability',
    yField: 'Average annual wage',
    colorField: 'education',
    size: [10, 16],
    sizeField: 'numbEmployed',
    shape: 'circle',
    yAxis: {
      nice: false,
      min: -20000,
      tickCount: 5,
      position: 'left',
      label: {
        formatter: (value) => {
          return Math.floor(value / 1000) + 'K';
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
    tooltip: {
      fields: ['probability', 'Average annual wage', 'numbEmployed'],
    },
    legend: false,
    xAxis: {
      min: -0.04,
      max: 1.04,
      nice: false,
    },
  };

  return <Scatter {...config} />
}

export default Point2;
