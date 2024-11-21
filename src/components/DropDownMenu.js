// src/components/DropDownMenu

// Categoriza todos los productos para que se puedan ver de manera más legible por el usuario
// *Nota*: Quizá sea mejor manejar esto del lado del servidor en vez de usar el csv directamente

import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

function DropdownMenu() {
  const categories = [
    {
      name: 'Medicamentos',
      subcategories: [
        {
          name: 'Anti-infecciosos',
          subcategories: [
            {
              name: 'Antibióticos',
              subcategories: [
                { name: 'Orales', code: '0001' },
                { name: 'Tópicos', code: '0047' },
                { name: 'Antibacterianos Tópicos', code: '0234' },
              ],
            },
            { name: 'Antimicóticos', code: '0004' },
            { name: 'Antivirales', code: '0008' },
            {
              name: 'Antiparasitarios',
              subcategories: [
                { name: 'Orales', code: '0007' },
                { name: 'Tópicos', code: '0056' },
              ],
            },
            { name: 'Anti-infecciosos Ginecológicos', code: '0053' },
            {
              name: 'Antisépticos',
              subcategories: [
                { name: 'Urinarios', code: '0054' },
                { name: 'Bucofaríngeos', code: '0059' },
                { name: 'Tópicos', code: '0106' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Digestivo',
          subcategories: [
            {
              name: 'Antiácidos y Antiulcerosos',
              subcategories: [
                { name: 'Antiácidos', code: '0019' },
                { name: 'Antiulcerosos', code: '0020' },
              ],
            },
            { name: 'Antidiarreicos', code: '0021' },
            { name: 'Antiespasmódicos', code: '0022' },
            { name: 'Laxantes', code: '0025' },
            {
              name: 'Otros Digestivos',
              subcategories: [
                { name: 'Otros Digestivos', code: '0023' },
                { name: 'Antiemético', code: '0048' },
                { name: 'Antihemorroidal', code: '0052' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Nervioso',
          subcategories: [
            {
              name: 'Antipsicóticos y Antidepresivos',
              subcategories: [
                { name: 'Antipsicóticos', code: '0016' },
                { name: 'Antidepresivos', code: '0028' },
              ],
            },
            {
              name: 'Ansiolíticos e Hipnóticos',
              subcategories: [
                { name: 'Hipnóticos', code: '0017' },
                { name: 'Tranquilizantes', code: '0018' },
              ],
            },
            {
              name: 'Antiepilépticos y Antiparkinsonianos',
              subcategories: [
                { name: 'Antiepilépticos', code: '0038' },
                { name: 'Antiparkinsonianos', code: '0039' },
              ],
            },
            {
              name: 'Otros del Sistema Nervioso',
              subcategories: [
                { name: 'Neurotónicos', code: '0077' },
                { name: 'Psicoestimulantes', code: '0085' },
                { name: 'Relajante Muscular', code: '0086' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Respiratorio',
          subcategories: [
            {
              name: 'Antigripales y Antitusivos',
              subcategories: [
                { name: 'Antigripales', code: '0031' },
                { name: 'Antitusivos', code: '0032' },
              ],
            },
            { name: 'Antiasmáticos', code: '0033' },
            {
              name: 'Antialérgicos',
              subcategories: [
                { name: 'Orales', code: '0029' },
                { name: 'Oftálmicos', code: '0104' },
              ],
            },
            {
              name: 'Descongestionantes',
              subcategories: [
                { name: 'Orales', code: '0041' },
                { name: 'Nasales', code: '0067' },
                { name: 'Tópicos', code: '0068' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Cardiovascular',
          subcategories: [
            { name: 'Antihipertensivos', code: '0003' },
            { name: 'Hipolipemiantes', code: '0010' },
            {
              name: 'Otros Cardiovasculares',
              subcategories: [
                { name: 'Otros Cardiovascular', code: '0012' },
                { name: 'Antigotoso', code: '0051' },
                { name: 'Antivaricosos', code: '0060' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Endocrino y Hormonal',
          subcategories: [
            { name: 'Diabetes', code: '0009' },
            {
              name: 'Hormonas y Terapias Hormonales',
              subcategories: [
                { name: 'Hormonoterapia', code: '0011' },
                { name: 'Tiroides', code: '0088' },
              ],
            },
            {
              name: 'Anticonceptivos y Salud Sexual',
              subcategories: [
                { name: 'Anticonceptivos', code: '0002' },
                { name: 'Disfunción Eréctil', code: '0070' },
              ],
            },
          ],
        },
        {
          name: 'Sistema Urinario',
          subcategories: [
            { name: 'Antiespasmódicos Urinarios', code: '0049' },
            { name: 'Otros Urinarios', code: '0096' },
            { name: 'Prostáticos', code: '0084' },
          ],
        },
        {
          name: 'Sistema Oftálmico',
          subcategories: [
            { name: 'Antibióticos Oftálmicos', code: '0046' },
            { name: 'Antiglaucoma', code: '0050' },
            { name: 'Otros Oftálmicos', code: '0082' },
            { name: 'Humectantes y Lubricantes de Córnea', code: '0239' },
          ],
        },
        {
          name: 'Analgésicos y Antiinflamatorios',
          subcategories: [
            { name: 'Analgésicos Generales', code: '0040' },
            { name: 'Analgésicos Antitérmicos / Antiinflamatorios', code: '0226' },
            {
              name: 'Analgésicos Especializados',
              subcategories: [
                { name: 'Analgésicos Femeninos', code: '0043' },
                { name: 'Analgésicos Tópicos', code: '0044' },
              ],
            },
            {
              name: 'Otros Analgésicos',
              subcategories: [
                { name: 'Anti-jaquecosos', code: '0055' },
                { name: 'Antirreumático', code: '0058' },
                { name: 'Anestésicos Locales', code: '0045' },
              ],
            },
          ],
        },
        { name: 'Antineoplásicos', code: '0005' },
        {
          name: 'Vacunas y Diagnóstico',
          subcategories: [
            { name: 'Vacunas', code: '0014' },
            { name: 'Diagnóstico', code: '0069' },
          ],
        },
      ],
    },
    {
      name: 'Suplementos y Vitaminas',
      subcategories: [
        {
          name: 'Vitaminas y Minerales',
          subcategories: [
            { name: 'Vitaminas Complejo B', code: '0015' },
            { name: 'Calcioterapia', code: '0026' },
            { name: 'Vitaminas', code: '0027' },
            { name: 'Antianémicos', code: '0037' },
            { name: 'Vitamina A+D', code: '0090' },
            { name: 'Suplementos Minerales', code: '0094' },
          ],
        },
        {
          name: 'Suplementos Dietarios y Probióticos',
          subcategories: [
            { name: 'Suplementos Dietarios', code: '0158' },
            { name: 'Probióticos', code: '0149' },
            { name: 'Estimulantes de Apetito', code: '0093' },
            { name: 'Endulzantes', code: '0071' },
          ],
        },
      ],
    },
    {
      name: 'Dermocosmética y Cuidado Personal',
      subcategories: [
        {
          name: 'Cuidado Facial',
          subcategories: [
            { name: 'Antiacné', code: '0036' },
            { name: 'Bálsamo Labial', code: '0061' },
            { name: 'Crema de Belleza', code: '0180' },
          ],
        },
        {
          name: 'Cuidado Corporal',
          subcategories: [
            { name: 'Antipruriginosos', code: '0057' },
            { name: 'Pomada Coceduras', code: '0083' },
            { name: 'Cicatrizantes', code: '0062' },
            { name: 'Corticoides Tópicos', code: '0148' },
          ],
        },
        {
          name: 'Cuidado Capilar',
          subcategories: [
            { name: 'Dermo Capilar', code: '0066' },
            { name: 'Shampoo Capilar', code: '0160' },
            { name: 'Bálsamo/Acondicionador Capilar', code: '0161' },
            { name: 'Tratamiento Capilar', code: '0175' },
            { name: 'Styling/Fijadores', code: '0176' },
            { name: 'Tintura para el Cabello', code: '0177' },
          ],
        },
        {
          name: 'Protección Solar',
          subcategories: [
            { name: 'Filtros Solares', code: '0179' },
          ],
        },
        {
          name: 'Cosméticos y Maquillaje',
          subcategories: [
            { name: 'Dermocosméticos', code: '0150' },
            { name: 'Cosméticos', code: '0183' },
            { name: 'Accesorios Cosméticos', code: '0184' },
          ],
        },
        {
          name: 'Fragancias',
          subcategories: [
            { name: 'Fragancia Masculina', code: '0185' },
            { name: 'Fragancia Femenina', code: '0186' },
          ],
        },
        {
          name: 'Otros Cuidado Personal',
          subcategories: [
            { name: 'Desodorantes Corporales', code: '0162' },
            { name: 'Jabones Adultos', code: '0163' },
            { name: 'Depilación', code: '0181' },
            { name: 'Talcos Corporales', code: '0182' },
            { name: 'Protección Femenina', code: '0190' },
          ],
        },
      ],
    },
    {
      name: 'Higiene Oral',
      subcategories: [
        {
          name: 'Cuidado Dental',
          subcategories: [
            { name: 'Pastas Dentales', code: '0165' },
            { name: 'Cepillos Dentales', code: '0166' },
            { name: 'Seda/Palillos Dentales', code: '0167' },
            { name: 'Enjuagues Bucales', code: '0170' },
            { name: 'Colutorios/Pastas', code: '0063' },
          ],
        },
        {
          name: 'Prótesis Dental',
          subcategories: [
            { name: 'Adhesivos Dentadura', code: '0168' },
            { name: 'Limpiadores Placa Dental', code: '0169' },
          ],
        },
      ],
    },
    {
      name: 'Cuidado Masculino',
      subcategories: [
        {
          name: 'Afeitado y Post-Afeitado',
          subcategories: [
            { name: 'Hojas/Máquinas de Afeitar', code: '0171' },
            { name: 'Crema de Afeitar', code: '0172' },
            { name: 'After Shave', code: '0173' },
          ],
        },
      ],
    },
    {
      name: 'Bebés y Maternidad',
      subcategories: [
        {
          name: 'Alimentación Infantil',
          subcategories: [
            { name: 'Leches Niños', code: '0076' },
            { name: 'Alimento para Bebé', code: '0202' },
          ],
        },
        {
          name: 'Cuidado e Higiene del Bebé',
          subcategories: [
            { name: 'Accesorios Bebé', code: '0187' },
            { name: 'Mamadera Bebé', code: '0230' },
            { name: 'Chupete Bebé', code: '0232' },
            { name: 'Perfumería Bebé', code: '0188' },
            { name: 'Pañales Infantiles', code: '0189' },
          ],
        },
      ],
    },
    {
      name: 'Ortopedia y Accesorios Médicos',
      subcategories: [
        {
          name: 'Accesorios Médicos',
          subcategories: [
            { name: 'Accesorios Médicos', code: '0098' },
            { name: 'Jeringa / Aguja', code: '0238' },
            { name: 'Algodón', code: '0237' },
            { name: 'Aerocámaras', code: '0101' },
            { name: 'Suero', code: '0087' },
            { name: 'Varios Médicos', code: '0159' },
          ],
        },
        {
          name: 'Ortopedia',
          subcategories: [
            { name: 'Accesorios Ortopédicos', code: '0099' },
            { name: 'Ortopédicos Otros', code: '0156' },
            { name: 'Guateros', code: '0227' },
          ],
        },
      ],
    },
    {
      name: 'Mascotas',
      subcategories: [
        {
          name: 'Medicamentos Veterinarios',
          subcategories: [
            { name: 'Analgésicos Generales Vet', code: '0123' },
            { name: 'Antibióticos Orales Vet', code: '0125' },
            { name: 'Antibióticos Tópicos Vet', code: '0126' },
            { name: 'Antidiarreicos Vet', code: '0128' },
            { name: 'Antiparasitarios Vet', code: '0130' },
            { name: 'Digestivos Vet', code: '0139' },
            { name: 'Vitaminas Vet', code: '0141' },
          ],
        },
        {
          name: 'Aseo y Belleza de Mascotas',
          subcategories: [
            { name: 'Aseo/Belleza', code: '0154' },
          ],
        },
      ],
    },
    {
      name: 'Otros Productos',
      subcategories: [
        {
          name: 'Primeros Auxilios',
          subcategories: [
            { name: 'Primeros Auxilios', code: '0109' },
            { name: 'Primeros Auxilios', code: '0155' },
          ],
        },
        {
          name: 'Accesorios y Varios',
          subcategories: [
            { name: 'Accesorios Podología', code: '0157' },
            { name: 'Textiles', code: '0221' },
            { name: 'Pañuelos Desechables', code: '0191' },
            { name: 'Fraccionados', code: '0107' },
            { name: 'Varios Médicos', code: '0159' },
          ],
        },
        {
          name: 'Alimentos y Bebidas',
          subcategories: [
            { name: 'Bebidas', code: '0212' },
            { name: 'Otros Alimentos', code: '0108' },
          ],
        },
        {
          name: 'Lubricantes e Intimidad',
          subcategories: [
            { name: 'Lubricantes Íntimos', code: '0113' },
          ],
        },
        {
          name: 'Productos Naturales',
          subcategories: [
            { name: 'Propóleo', code: '0236' },
          ],
        },
      ],
    },
  ];

  const renderMenuItems = (categories) =>
    categories.map((category, index) => {
      if (category.subcategories) {
        return (
          <Dropdown key={index} drop="end" className="dropdown-submenu">
            <Dropdown.Toggle as="div" className="dropdown-item">
              {category.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>{renderMenuItems(category.subcategories)}</Dropdown.Menu>
          </Dropdown>
        );
      } else {
        return (
          <Dropdown.Item
            as={Link}
            to={`/productos?categoria=${category.code || encodeURIComponent(category.name)}`}
            key={index}
          >
            {category.name}
          </Dropdown.Item>
        );
      }
    });

  return <>{renderMenuItems(categories)}</>;
}

export default DropdownMenu;
