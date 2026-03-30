import blogFactoryPower from "@/assets/blog-factory-power.jpg";
import blogFactoryMachinery from "@/assets/blog-factory-machinery.jpg";
import blogFactoryQuality from "@/assets/blog-factory-quality.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ctc-winding-wire-manufacturing",
    title: "Inside CTC Winding Wire Manufacturing: Precision at Every Turn",
    excerpt: "A behind-the-scenes look at how our factory floor teams produce continuously transposed conductors that power the world's most critical infrastructure.",
    content: `
# Inside CTC Winding Wire Manufacturing: Precision at Every Turn

Walk into our factory floor and the first thing you notice is the rhythmic hum of copper wire being drawn, insulated, and transposed with surgical precision. Every coil that leaves our facility carries the expertise of skilled workers who understand that in power infrastructure, there is zero margin for error.

## The Human Element in Precision Manufacturing

While automation handles repetitive tasks, it's our experienced operators who ensure quality at every stage. From monitoring wire tension during the transposing process to conducting real-time visual inspections, our team brings decades of cumulative expertise to every production run.

## Process-Controlled Excellence

Our manufacturing follows a rigorous process flow:
- **Wire Drawing**: Copper rods are drawn to exact specifications with tolerances measured in microns
- **Insulation Application**: Multiple layers of paper and enamel insulation are applied with consistent thickness
- **Transposing**: Individual strands are precisely interwoven to minimize eddy current losses
- **Quality Testing**: Every batch undergoes dielectric strength, dimensional accuracy, and insulation resistance testing

## Why It Matters

When a transformer fails in a power grid, entire cities go dark. Our factory workers understand this responsibility. Every wire they produce is a link in the chain that keeps critical infrastructure running—from hospitals to data centers to national grids.

## Continuous Improvement

Our team participates in regular Kaizen sessions, identifying opportunities to improve yield, reduce waste, and enhance product consistency. This culture of continuous improvement has helped us maintain defect rates well below industry benchmarks.
    `,
    author: "Rajesh Patel",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "MANUFACTURING",
    image: blogFactoryPower
  },
  {
    id: "precision-engineering-motor-components",
    title: "Precision Engineering: How Our Technicians Build Motor-Grade Components",
    excerpt: "From alternator windings to traction motor coils, our skilled technicians combine craftsmanship with cutting-edge machinery to deliver mission-critical components.",
    content: `
# Precision Engineering: How Our Technicians Build Motor-Grade Components

In the world of heavy electrical machinery, component quality can mean the difference between decades of reliable service and catastrophic failure. Our technicians are the unsung heroes who bridge the gap between engineering specifications and physical reality.

## Craftsmanship Meets Technology

Our factory floor combines traditional winding expertise with modern CNC-controlled equipment. Technicians undergo extensive training before they're certified to work on mission-critical components for:
- **High-voltage motors** used in industrial applications
- **Traction motors** for locomotives and metro systems
- **Alternator windings** for power generation
- **Turbine generator components**

## The Assembly Process

Each component goes through a meticulous assembly workflow:

### Stage 1: Material Preparation
Raw conductors are inspected, cut, and prepared according to exact engineering drawings. Our team verifies material certificates and cross-references with customer specifications.

### Stage 2: Winding & Assembly
Skilled operators use both manual and automated winding techniques depending on the component complexity. Critical dimensions are checked at multiple points during assembly.

### Stage 3: Impregnation & Curing
Components undergo vacuum pressure impregnation (VPI) to ensure complete resin penetration, followed by controlled curing cycles that our operators monitor continuously.

### Stage 4: Final Testing
Every finished component undergoes comprehensive electrical and mechanical testing before shipment.

## The Team Behind the Product

Our technicians average over 12 years of experience in electrical component manufacturing. Many have been trained by master craftsmen who pioneered CTC manufacturing techniques in India. This institutional knowledge is our greatest competitive advantage.
    `,
    author: "Amit Sharma",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "ENGINEERING",
    image: blogFactoryMachinery
  },
  {
    id: "quality-control-insulation-testing",
    title: "Quality Control in Insulation Testing: Our Lab Team's Commitment to Zero Defects",
    excerpt: "How our quality assurance engineers ensure every product meets IS, IEC, and ASTM standards through rigorous testing protocols and continuous monitoring.",
    content: `
# Quality Control in Insulation Testing: Our Lab Team's Commitment to Zero Defects

In electrical insulation manufacturing, quality isn't just a department—it's a culture. Our quality control lab operates as the final checkpoint before any product reaches our customers, and our team takes this responsibility seriously.

## The Testing Ecosystem

Our state-of-the-art quality lab is equipped with testing infrastructure that covers every critical parameter:

### Electrical Testing
- **Dielectric strength testing** up to 100kV
- **Insulation resistance measurement** using megohmmeter
- **Tan delta testing** for insulation aging assessment
- **Partial discharge testing** for HV applications

### Mechanical Testing
- **Tensile strength and elongation** per ASTM standards
- **Flexibility and bend testing** for winding applications
- **Dimensional accuracy** using precision measuring instruments
- **Surface finish inspection** under magnification

### Thermal Testing
- **Temperature index determination**
- **Thermal endurance testing** per IEC standards
- **Heat shock resistance**
- **Thermal conductivity measurement**

## Certification Compliance

Every product batch is tested against multiple international standards:
- **IS (Indian Standards)** for domestic compliance
- **IEC (International Electrotechnical Commission)** for global acceptance
- **ASTM (American Society for Testing and Materials)** for material properties

## The Human Factor

While our testing equipment provides precise measurements, it's our quality engineers who interpret results, identify trends, and make critical accept/reject decisions. Their expertise in understanding how test results correlate with field performance is invaluable.

## Traceability & Documentation

Every test result is documented and linked to specific production batches through our quality management system. This complete traceability gives our customers confidence and provides data for continuous process improvement.

## A Culture of Quality

Our quality team participates in regular calibration audits, inter-laboratory comparison programs, and continuing education on evolving standards. This commitment ensures that our testing capabilities remain at the forefront of industry best practices.
    `,
    author: "Dr. Priya Mehta",
    date: "2024-03-05",
    readTime: "10 min read",
    category: "QUALITY",
    image: blogFactoryQuality
  }
];
