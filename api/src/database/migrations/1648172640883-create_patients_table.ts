import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPatientsTable1648172640883 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'pacientes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'idade',
          type: 'int'
        },
        {
          name: 'cpf',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'rg',
          type: 'varchar'
        },
        {
          name: 'data_nasc',
          type: 'varchar'
        },
        {
          name: 'sexo',
          type: 'varchar'
        },
        {
          name: 'signo',
          type: 'varchar'
        },
        {
          name: 'mae',
          type: 'varchar'
        },
        {
          name: 'pai',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'senha',
          type: 'varchar'
        },
        {
          name: 'cep',
          type: 'varchar'
        },
        {
          name: 'endereco',
          type: 'varchar'
        },
        {
          name: 'numero',
          type: 'int'
        },
        {
          name: 'bairro',
          type: 'varchar'
        },
        {
          name: 'cidade',
          type: 'varchar'
        },
        {
          name: 'estado',
          type: 'varchar'
        },
        {
          name: 'telefone_fixo',
          type: 'varchar'
        },
        {
          name: 'celular',
          type: 'varchar'
        },
        {
          name: 'altura',
          type: 'varchar'
        },
        {
          name: 'peso',
          type: 'int'
        },
        {
          name: 'tipo_sanguineo',
          type: 'varchar'
        },
        {
          name: 'cor',
          type: 'varchar'
        }
      ]
    }))

    await queryRunner.query(`
    INSERT INTO pacientes (nome,idade,cpf,rg,data_nasc,sexo,signo,mae,pai,email,senha,cep,endereco,numero,bairro,cidade,estado,telefone_fixo,celular,altura,peso,tipo_sanguineo,cor) VALUES
    ('Alexandre Caleb Costa', 55, '97464252420', '221072469', '19-01-1967', 'Masculino', 'Capricórnio', 'Beatriz Alícia', 'Nelson Heitor Costa', 'aalexandrecalebcosta@br.loreal.com', '6eXIFok6iQ', '69309415', 'Rua das Palmas de Santa Rita', 765, 'Pricumã', 'Boa Vista','RR', '9537839661', '95993591588', '1,96', '63', 'A-', 'laranja'),
    ('Rebeca Pietra Alana Pinto', 33, '85435583446', '448588614', '18-01-1989', 'Feminino', 'Capricórnio', 'Bianca Melissa Elisa', 'Rafael Cauã Pinto', 'rebecapietraalanapinto_@dpf.gov.br', 'PZ4qyZRrww', '78750640', 'Rua Padre Toledo', 949, 'Vila Rica', 'Rondonópolis','MT', '6637808173', '66982593063', '1,83', '74', 'AB+', 'amarelo'),
    ('Murilo Luan Baptista', 46, '28188594849', '168517607', '05-01-1976', 'Masculino', 'Capricórnio', 'Gabrielly Olivia Lara', 'Davi Diego Baptista', 'mmuriloluanbaptista@achievecidadenova.com.br', '9oCHd2pYSg', '68902170', 'Avenida dos Timbiras', 693, 'Beirol', 'Macapá','AP', '9625399855', '96982746931', '1,83', '105', 'B-', 'verde'),
    ('Vera Natália Costa', 29, '04189783870', '429889331', '03-01-1993', 'Feminino', 'Capricórnio', 'Bruna Stella Sophia', 'Ruan Bento Vinicius Costa', 'vveranataliacosta@a.com', 'L7zRwwAjH3', '69317332', 'Rua Curitiba', 520, 'Equatorial', 'Boa Vista','RR', '9537811423', '95991832283', '1,52', '68', 'B+', 'preto'),
    ('Jennifer Amanda Aline Figueiredo', 44, '36110449709', '348826047', '26-01-1978', 'Feminino', 'Aquário', 'Antônia Malu Caroline', 'Renan Henry Figueiredo', 'jenniferamandaalinefigueiredo_@click21.com.br', 'AGEISGirBU', '68928340', 'Travessa Açaí', 694, 'Fonte Nova', 'Santana','AP', '9629257666', '96992276974', '1,79', '89', 'A-', 'vermelho'),
    ('Levi Sérgio Pietro Martins', 69, '43661268694', '389837283', '26-01-1953', 'Masculino', 'Aquário', 'Márcia Betina', 'Cauã Leonardo Martins', 'levisergiopietromartins..levisergiopietromartins@tedde.com.br', 'Q263iDGO5w', '69908878', 'Rua Ítalo Santos da Silva', 358, 'Loteamento Santo Afonso', 'Rio Branco','AC', '6837987376', '68984051846', '1,77', '101', 'O+', 'roxo'),
    ('Tomás Filipe Cavalcanti', 29, '69365549116', '408390803', '05-01-1993', 'Masculino', 'Capricórnio', 'Camila Vanessa Luna', 'Bento Heitor Benjamin Cavalcanti', 'ttomasfilipecavalcanti@weatherford.com', 'iDz4pXbIUj', '79091600', 'Rua Alcides Guimarães Pereira', 461, 'Parque Residencial União', 'Campo Grande','MS', '6728605590', '67982353548', '1,80', '106', 'AB+', 'amarelo'),
    ('Diego Caio Benjamin da Mota', 31, '81926370180', '231409576', '12-01-1991', 'Masculino', 'Capricórnio', 'Letícia Isabella', 'Yuri Arthur da Mota', 'ddiegocaiobenjamindamota@vuyu.es', 'XXhUkLnXQx', '60750030', 'Avenida D', 836, 'Prefeito José Walter', 'Fortaleza','CE', '8528962889', '85984776554', '1,92', '100', 'O-', 'amarelo'),
    ('Sabrina Priscila Lavínia Lima', 30, '84951616050', '456577336', '25-01-1992', 'Feminino', 'Aquário', 'Carla Maya Isabella', 'Carlos Eduardo Marcos Lima', 'sabrinapriscilalavinialima..sabrinapriscilalavinialima@panevale.com.br', 'Xne8wK8ROg', '64039665', 'Quadra 04', 123, 'Esplanada', 'Teresina','PI', '8626740661', '86988828303', '1,51', '86', 'AB-', 'verde'),
    ('Sueli Tânia Raimunda Melo', 58, '16198039331', '385818646', '04-01-1964', 'Feminino', 'Capricórnio', 'Hadassa Lara', 'Benedito Mateus Melo', 'suelitaniaraimundamelo__suelitaniaraimundamelo@gineco.med.br', 'rhr2dj4xgR', '79620070', 'Rua Itacil Pereira Martins', 418, 'Santos Dumont', 'Três Lagoas','MS', '6728621814', '67981747340', '1,61', '90', 'A-', 'azul'),
    ('Nina Laura Rezende', 24, '37184524217', '207700308', '09-01-1998', 'Feminino', 'Capricórnio', 'Isadora Adriana Aline', 'Márcio Henrique Rezende', 'ninalaurarezende-82@cancaonova.com', 'EF2kWW0Ih7', '31070180', 'Rua Cândido Siqueira', 367, 'Nova Vista', 'Belo Horizonte','MG', '3127447865', '31992587924', '1,82', '90', 'B-', 'vermelho'),
    ('Miguel Renato Henrique da Rocha', 19, '28577370763', '421266259', '04-01-2003', 'Masculino', 'Capricórnio', 'Daiane Sabrina Gabriela', 'Henry Daniel Henrique da Rocha', 'miguelrenatohenriquedarocha..miguelrenatohenriquedarocha@email.com', 'qiNPU8iDAT', '65071865', 'Rua São Brás', 533, 'Vila Conceição (Calhau)', 'São Luís','MA', '9836651081', '98995454223', '1,96', '95', 'A-', 'vermelho'),
    ('André Gael Souza', 33, '87723256663', '191658601', '28-01-1989', 'Masculino', 'Aquário', 'Alice Sophia', 'Renan Vicente Souza', 'andregaelsouza__andregaelsouza@uzgames.com', 'Bl3x3NDbzq', '29050260', 'Rua Engenheiro Guilherme José Monjardim Varejão', 556, 'Enseada do Suá', 'Vitória','ES', '2735583493', '27996218771', '1,71', '89', 'A-', 'laranja'),
    ('Manoel Arthur Costa', 22, '91812690720', '476646455', '25-01-2000', 'Masculino', 'Aquário', 'Sueli Simone', 'Miguel Fábio Marcos Vinicius Costa', 'manoelarthurcosta__manoelarthurcosta@hotmail.com.br', '1m2pzJSsND', '49043824', 'Rua Vale do Amanhecer', 602, 'Santa Maria', 'Aracaju','SE', '7938964660', '79992402667', '1,80', '87', 'B-', 'amarelo'),
    ('Thales Arthur Rocha', 46, '69100377074', '333619821', '11-01-1976', 'Masculino', 'Capricórnio', 'Alícia Nair Patrícia', 'Joaquim Jorge Oliver Rocha', 'tthalesarthurrocha@leoshehtman.com.br', 'GXNObQlJ9r', '52060312', '4ª Travessa Lemos Torres', 266, 'Casa Forte', 'Recife','PE', '8127936523', '81997901172', '1,64', '88', 'O-', 'amarelo'),
    ('Emilly Laura Figueiredo', 46, '59140367630', '391668432', '13-01-1976', 'Feminino', 'Capricórnio', 'Giovana Márcia', 'Miguel Vinicius Otávio Figueiredo', 'emillylaurafigueiredo..emillylaurafigueiredo@torah.com.br', 'bxbmOf70Rj', '77824576', 'Rua L', 650, 'Loteamento Castelo Branco', 'Araguaína','TO', '6327712549', '63991704924', '1,50', '53', 'AB+', 'roxo'),
    ('Marcos Henrique Miguel da Cunha', 70, '28109501052', '309935246', '28-01-1952', 'Masculino', 'Aquário', 'Daniela Ana', 'Jorge Elias Severino da Cunha', 'marcoshenriquemigueldacunha_@comercialrafael.com.br', 'U12c5yD7AH', '99709468', 'Rua Eduardo Machiavelli', 304, 'Cerâmica', 'Erechim','RS', '5425036670', '54988526250', '1,74', '70', 'AB+', 'amarelo'),
    ('Alice Analu Lavínia da Cruz', 36, '06922182545', '391699726', '17-01-1986', 'Feminino', 'Capricórnio', 'Adriana Julia Fabiana', 'Emanuel Carlos Sérgio da Cruz', 'aliceanalulaviniadacruz-80@peopleside.com.br', '3d10wHAnag', '79102010', 'Rua Fortaleza', 977, 'Jardim Imá', 'Campo Grande','MS', '6728910986', '67985244542', '1,83', '58', 'A+', 'laranja'),
    ('Bianca Aurora Andrea Caldeira', 51, '36951415650', '100505399', '22-01-1971', 'Feminino', 'Aquário', 'Heloisa Ana Alícia', 'Carlos Juan Ricardo Caldeira', 'biancaauroraandreacaldeira..biancaauroraandreacaldeira@smalte.com.br', 'jc7hBI8Iro', '69909040', 'Rodovia BR-364', 840, 'Residencial Rosa Linda', 'Rio Branco','AC', '6839403868', '68993447012', '1,68', '76', 'A+', 'azul'),
    ('Elaine Adriana Luana das Neves', 21, '78516638227', '428387986', '08-01-2001', 'Feminino', 'Capricórnio', 'Vitória Julia', 'Oliver Isaac Pedro Henrique das Neves', 'elaineadrianaluanadasneves-75@yaooll.com', 'ar5A3hrOZ7', '69917668', 'Rua Soldado Oliveira', 980, 'Pedro Roseno', 'Rio Branco','AC', '6839641461', '68985904290', '1,81', '57', 'O-', 'preto'),
    ('Emily Aparecida Lúcia Farias', 75, '41056346744', '176087394', '10-01-1947', 'Feminino', 'Capricórnio', 'Helena Flávia', 'Noah Rodrigo Farias', 'emilyaparecidaluciafarias-71@ftcomercial.com.br', 'GtbJPCctsK', '25900486', 'Travessa C', 229, 'Vila Atlântica', 'Magé','RJ', '2126543812', '21987096033', '1,63', '88', 'A+', 'vermelho'),
    ('Anthony Caio Hugo da Costa', 19, '98608311658', '251560831', '11-01-2003', 'Masculino', 'Capricórnio', 'Débora Isabela', 'Benedito Matheus da Costa', 'aanthonycaiohugodacosta@nipnet.com.br', 'k6J4DSfQMh', '69911176', 'Travessa Cacoal', 910, 'Pista', 'Rio Branco','AC', '6835819862', '68986094983', '1,94', '93', 'B-', 'amarelo'),
    ('Bernardo Nelson Noah Souza', 23, '61870279654', '238487854', '24-01-1999', 'Masculino', 'Aquário', 'Alice Vitória Fernanda', 'Enzo Thiago Ryan Souza', 'bernardonelsonnoahsouza_@ibest.com.br', 'F4E3oFKX9y', '60415740', 'Vila Muguacu', 917, 'Jardim América', 'Fortaleza','CE', '8528132869', '85989370929', '1,98', '75', 'O-', 'laranja'),
    ('Nair Kamilly Fátima Oliveira', 77, '05185005190', '506270671', '10-01-1945', 'Feminino', 'Capricórnio', 'Natália Clara', 'Raimundo Mateus Bruno Oliveira', 'nairkamillyfatimaoliveira-94@oxiteno.com', 'BHiLAJQGrb', '79320046', 'Alameda Souza', 752, 'Aeroporto', 'Corumbá','MS', '6725707566', '67984223109', '1,77', '87', 'O+', 'laranja'),
    ('Gabrielly Emanuelly Olivia Viana', 67, '16749169066', '351276518', '23-01-1955', 'Feminino', 'Aquário', 'Milena Simone Lavínia', 'Mateus Emanuel Fernando Viana', 'gabriellyemanuellyoliviaviana..gabriellyemanuellyoliviaviana@moen.com.br', 'Dgt15q8gqD', '76907446', 'Rua Martinho Lutero', 225, 'Jardim Aurélio Bernardi', 'Ji-Paraná','RO', '6935255380', '69989786530', '1,62', '68', 'O-', 'amarelo'),
    ('Ruan Severino da Paz', 30, '56735499549', '114372834', '20-01-1992', 'Masculino', 'Capricórnio', 'Luzia Fabiana', 'Manoel Erick da Paz', 'rruanseverinodapaz@patriciagrillo.adv.br', 'EMy2kUXjP5', '69312015', 'Rua Abrilina Pena', 426, 'Jardim Floresta', 'Boa Vista','RR', '9539869046', '95994106161', '1,82', '84', 'AB+', 'azul'),
    ('Kaique Pietro Felipe Rezende', 77, '99710326511', '204116569', '12-01-1945', 'Masculino', 'Capricórnio', 'Alice Emily', 'Juan Jorge Miguel Rezende', 'kaiquepietrofeliperezende__kaiquepietrofeliperezende@autvale.com', 'y1jJJLohA8', '78068515', 'Rua Quarenta e Três', 988, 'Boa Esperança', 'Cuiabá','MT', '6537667169', '65996785075', '2,00', '68', 'B-', 'amarelo'),
    ('Simone Malu Santos', 18, '66444051509', '240501676', '19-01-2004', 'Feminino', 'Capricórnio', 'Helena Hadassa Andreia', 'Levi Lucca Igor Santos', 'ssimonemalusantos@idesc.com.br', 'Rb9s4bubmU', '64022135', 'Avenida Henry Wall de Carvalho', 284, 'Lourival Parente', 'Teresina','PI', '8625731577', '86992392473', '1,54', '79', 'B+', 'laranja'),
    ('Tomás Nelson Vieira', 57, '31261418891', '282998081', '19-01-1965', 'Masculino', 'Capricórnio', 'Laís Lavínia Rita', 'Benjamin Kevin Vieira', 'tomasnelsonvieira_@validtecnologia.com.br', '5JXJzfm8Xb', '47810121', 'Rua João Batista da Silva', 280, 'Morada Nobre', 'Barreiras','BA', '7729682457', '77994610872', '1,66', '86', 'AB+', 'azul'),
    ('Laura Isabelle Carvalho', 50, '56328406622', '176655177', '19-01-1972', 'Feminino', 'Capricórnio', 'Betina Isabel', 'Thales Fábio Carvalho', 'llauraisabellecarvalho@molsanto.com', 'mrdByJpz9q', '76900445', 'Alameda das Águas', 678, 'Vila de Rondônia', 'Ji-Paraná','RO', '6936054649', '69989398255', '1,84', '80', 'O+', 'azul'),
    ('Raimundo Ricardo Figueiredo', 65, '52931007420', '411302462', '27-01-1957', 'Masculino', 'Aquário', 'Marlene Simone Natália', 'Emanuel Luiz Figueiredo', 'rraimundoricardofigueiredo@runup.com.br', 'dPAdmHerz4', '49082260', 'Rua José Conrado de Araújo', 976, 'Novo Paraíso', 'Aracaju','SE', '7928785318', '79981268477', '1,98', '54', 'A-', 'azul'),
    ('Lorena Mariah Barbosa', 61, '22249196974', '279429642', '08-01-1961', 'Feminino', 'Capricórnio', 'Hadassa Mirella Malu', 'Filipe Anthony Barbosa', 'lorenamariahbarbosa_@amure.com.br', '5dsN5nX3TT', '69312456', 'Travessa São Mateus', 604, 'Cinturão Verde', 'Boa Vista','RR', '9527293784', '95998784724', '1,50', '63', 'A-', 'verde'),
    ('Agatha Bruna da Rosa', 24, '48916489962', '414136378', '16-01-1998', 'Feminino', 'Capricórnio', 'Gabriela Joana Marli', 'Iago Vicente Mário da Rosa', 'agathabrunadarosa_@foz.com.br', 'tsfp0MFqI9', '72601210', 'Quadra Quadra 106 Conjunto 6', 406, 'Recanto das Emas', 'Brasília','DF', '6126266589', '61997338636', '1,80', '88', 'B-', 'amarelo'),
    ('Vanessa Isabella Mariane Novaes', 25, '44188941529', '446932954', '17-01-1997', 'Feminino', 'Capricórnio', 'Laura Lara Ana', 'Nelson Iago Vinicius Novaes', 'vanessaisabellamarianenovaes..vanessaisabellamarianenovaes@yazigi.com', 'f55aWCAg4G', '77426036', 'Rua A12', 444, 'Residencial Park dos Buritis', 'Gurupi','TO', '6329895384', '63981066411', '1,73', '68', 'B+', 'roxo'),
    ('Murilo Paulo Diogo Lima', 69, '27284605154', '484666034', '20-01-1953', 'Masculino', 'Capricórnio', 'Andreia Marina', 'Ruan Heitor Lima', 'murilopaulodiogolima-78@anac.gov.br', 'wLPCEqsFO3', '88306742', 'Rua Julia Buazir Atanazio', 562, 'Balneário Santa Clara', 'Itajaí','SC', '4739471014', '47999787595', '1,65', '98', 'B+', 'laranja'),
    ('Severino Isaac Osvaldo Pires', 57, '86854603102', '445704366', '17-01-1965', 'Masculino', 'Capricórnio', 'Alice Eloá', 'Thales Ricardo Pires', 'sseverinoisaacosvaldopires@br.com.br', '1WMt3oZ6Bk', '68908455', 'Travessa Luis Cezar Picanço', 688, 'São Lázaro', 'Macapá','AP', '9627734709', '96983129955', '1,86', '69', 'AB-', 'vermelho'),
    ('Daniel Nicolas Anderson Nogueira', 80, '88808764656', '496143943', '13-01-1942', 'Masculino', 'Capricórnio', 'Sebastiana Evelyn Isabelle', 'Nelson Tomás Nogueira', 'danielnicolasandersonnogueira-92@dyna.com.br', '6ujxzZjbyN', '69921290', 'Travessa 3 de Julho', 338, 'Alto Alegre', 'Rio Branco','AC', '6838235842', '68986410296', '1,91', '95', 'B+', 'laranja'),
    ('Caio Ryan Augusto Corte Real', 80, '80721840590', '268351351', '14-01-1942', 'Masculino', 'Capricórnio', 'Cecília Eliane', 'Manoel Caleb Daniel Corte Real', 'caioryanaugustocortereal__caioryanaugustocortereal@kframe.com.br', 'EMY1dis6nQ', '82510290', 'Rua Canadá', 700, 'Bacacheri', 'Curitiba','PR', '4138130576', '41995084843', '1,96', '86', 'AB+', 'roxo'),
    ('Diogo Marcos Fogaça', 33, '95593087423', '489748193', '07-01-1989', 'Masculino', 'Capricórnio', 'Regina Sabrina Luana', 'Victor Luiz Pedro Henrique Fogaça', 'diogomarcosfogaca_@nelsoncosta.com.br', 'i4JJ4fOuPp', '69036730', 'Beco Ursa Menor', 506, 'Santo Agostinho', 'Manaus','AM', '9227307741', '92986168496', '1,91', '70', 'B-', 'roxo'),
    ('Patrícia Isabelly Tereza da Paz', 22, '90907856470', '145636197', '07-01-2000', 'Feminino', 'Capricórnio', 'Sandra Tânia Sueli', 'Erick Marcelo Gabriel da Paz', 'patriciaisabellyterezadapaz__patriciaisabellyterezadapaz@bseletronicos.com.br', 'wCRtHAjopC', '56503090', 'Rua I', 519, 'São Cristóvão', 'Arcoverde','PE', '8727231966', '87983533411', '1,79', '79', 'A+', 'amarelo'),
    ('Rita Marcela Castro', 75, '21854366009', '389858225', '04-01-1947', 'Feminino', 'Capricórnio', 'Gabrielly Emilly', 'Tiago Roberto Castro', 'ritamarcelacastro-80@costaporto.com.br', 'zh7sFbBtHG', '76908492', 'Rua Curitiba', 997, 'Nova Brasília', 'Ji-Paraná','RO', '6927642812', '69999750438', '1,79', '77', 'A-', 'vermelho'),
    ('Kamilly Ana Josefa Rezende', 67, '12797831683', '176846542', '23-01-1955', 'Feminino', 'Aquário', 'Cláudia Rita Lara', 'Benjamin Danilo Rezende', 'kkamillyanajosefarezende@sobraer.com.br', '69Ms39jOHP', '68909000', 'Rua Vereador Julio Maria Pinto Pereira', 804, 'Jardim Felicidade', 'Macapá','AP', '9629520939', '96985292089', '1,74', '87', 'B+', 'vermelho'),
    ('Fernando Vitor Santos', 26, '13042350258', '189404279', '23-01-1996', 'Masculino', 'Aquário', 'Stella Yasmin Luciana', 'João Mateus Tomás Santos', 'fernandovitorsantos..fernandovitorsantos@yande.com.br', '3CtLizaC21', '69030098', 'Beco Danilo II', 264, 'Compensa', 'Manaus','AM', '9235539999', '92981231855', '1,64', '64', 'A+', 'verde'),
    ('Guilherme Ruan Castro', 55, '96219405080', '131515652', '07-01-1967', 'Masculino', 'Capricórnio', 'Nair Esther', 'Oliver Márcio Castro', 'guilhermeruancastro_@me.com.br', 'Mn6roeriEc', '64058130', 'Rua Artesão Valdery Vasconcelos', 270, 'Samapi', 'Teresina','PI', '8626426425', '86988743949', '1,80', '110', 'A-', 'vermelho'),
    ('Benedita Mirella Aurora Alves', 71, '77742136007', '343300035', '11-01-1951', 'Feminino', 'Capricórnio', 'Isabella Tânia', 'Caio Heitor Alves', 'bbeneditamirellaauroraalves@freitasprior.com.br', 'i1GUTUcqBg', '89074475', 'Rua Adolfo Prochnow', 989, 'Testo Salto', 'Blumenau','SC', '4729554174', '47982990613', '1,60', '54', 'AB+', 'laranja'),
    ('Sandra Jaqueline Patrícia da Cunha', 74, '44533695060', '323821054', '26-01-1948', 'Feminino', 'Aquário', 'Stefany Elza Marli', 'Eduardo Theo da Cunha', 'sandrajaquelinepatriciadacunha__sandrajaquelinepatriciadacunha@performa.com.br', 'XPn8mBmlhm', '68903381', 'Ramal Mururema', 731, 'Jardim Marco Zero', 'Macapá','AP', '9626348683', '96982470971', '1,53', '90', 'A+', 'amarelo'),
    ('Nicolas Daniel Theo Baptista', 19, '69607705998', '277796003', '11-01-2003', 'Masculino', 'Capricórnio', 'Márcia Vera Eduarda', 'Gabriel Kaique Baptista', 'nicolasdanieltheobaptista..nicolasdanieltheobaptista@dsladvogados.adv.br', 'thUbkENnlK', '58701414', 'Rua Bernardino Felipe Santos', 462, 'Maternidade', 'Patos','PB', '8335016103', '83987567284', '1,88', '66', 'B-', 'preto'),
    ('Thales Yuri Antonio Costa', 68, '13170364090', '188175271', '01-01-1954', 'Masculino', 'Capricórnio', 'Manuela Betina Mariane', 'Nicolas Gael Roberto Costa', 'thalesyuriantoniocosta-86@opcaoeduca.com.br', 'IkoPXslCLq', '76913641', 'Avenida Édson Lima do Nascimento', 903, 'São Pedro', 'Ji-Paraná','RO', '6937495879', '69992446643', '1,99', '58', 'A+', 'azul'),
    ('Caio Benedito Erick Caldeira', 43, '97434077239', '253764701', '20-01-1979', 'Masculino', 'Capricórnio', 'Eliane Vanessa Fátima', 'Geraldo Igor Kaique Caldeira', 'caiobeneditoerickcaldeira-99@mpv.org.br', 'iyLALkE8SR', '69093415', 'Avenida Torquato Tapajós', 187, 'Colônia Terra Nova', 'Manaus','AM', '9229270390', '92989568584', '1,71', '50', 'A+', 'preto'),
    ('Luiza Laís Alice Gomes', 22, '05561320840', '428800439', '17-01-2000', 'Feminino', 'Capricórnio', 'Juliana Giovanna Priscila', 'Danilo Gael Gomes', 'luizalaisalicegomes..luizalaisalicegomes@creativeinteriores.com.br', '6gbdKm2Zrs', '76810561', 'Rua Maldonado', 163, 'Cidade Nova', 'Porto Velho','RO', '6939091469', '69994744348', '1,63', '89', 'A+', 'preto'),
    ('Fabiana Nair Porto', 62, '06371815652', '121081114', '28-01-1960', 'Feminino', 'Aquário', 'Patrícia Pietra', 'Ruan Vinicius Porto', 'ffabiananairporto@alstom.com', 'j6J5rSu03a', '59067360', 'Rua dos Cardeais', 355, 'Pitimbu', 'Natal','RN', '8437641908', '84997283694', '1,54', '48', 'B-', 'laranja'),
    ('Rafaela Gabrielly Nicole Barros', 79, '84167752301', '324512946', '20-01-1943', 'Feminino', 'Capricórnio', 'Mariah Márcia', 'Guilherme Yuri Caio Barros', 'rafaelagabriellynicolebarros-96@yogoothies.com.br', 'JkLTP8H1Pe', '53429170', 'Rua Cruzeiro', 777, 'Nossa Senhora da Conceição', 'Paulista','PE', '8125649604', '81993280277', '1,81', '90', 'AB-', 'preto'),
    ('Andrea Aurora Carvalho', 24, '16645672403', '468876327', '07-01-1998', 'Feminino', 'Capricórnio', 'Adriana Mirella', 'Luiz Tiago Carvalho', 'andreaauroracarvalho__andreaauroracarvalho@abbott.com', 'GqfuICb3T2', '60766195', 'Rua José Augusto de Oliveira', 233, 'Planalto Ayrton Senna', 'Fortaleza','CE', '8536088456', '85981471758', '1,76', '78', 'A+', 'laranja'),
    ('Kevin Thomas Bruno Pires', 41, '88536701692', '268914813', '19-01-1981', 'Masculino', 'Capricórnio', 'Isabelly Helena', 'Francisco Caio Kevin Pires', 'kevinthomasbrunopires..kevinthomasbrunopires@dominiozeladoria.com.br', 'xi3Ywtesun', '56312380', 'Rua Carlos Lambrine', 711, 'São Gonçalo', 'Petrolina','PE', '8738709048', '87983410047', '1,92', '63', 'B-', 'vermelho'),
    ('Márcio Leandro Daniel Assunção', 19, '04545650384', '383920267', '27-01-2003', 'Masculino', 'Aquário', 'Larissa Rayssa', 'Noah Calebe Erick Assunção', 'marcioleandrodanielassuncao__marcioleandrodanielassuncao@pq.cnpq.br', 'lb2P76nPi5', '87240970', 'Rua Presidente Tancredo Neves 332', 208, 'Centro', 'Terra Boa','PR', '4439249677', '44997698093', '1,64', '56', 'A-', 'vermelho'),
    ('Maria Simone Porto', 38, '68637537820', '501837425', '03-01-1984', 'Feminino', 'Capricórnio', 'Bruna Débora', 'Sérgio Nelson Porto', 'mmariasimoneporto@clcimoveis.com.br', 'iBYNYJxw4o', '60830165', 'Rua Poeta João Cabral de Melo Neto', 224, 'José de Alencar', 'Fortaleza','CE', '8539328327', '85983445635', '1,84', '86', 'O-', 'roxo'),
    ('Francisca Elaine Lopes', 57, '44898462901', '172493547', '04-01-1965', 'Feminino', 'Capricórnio', 'Liz Lara Maria', 'Erick Leonardo Lopes', 'franciscaelainelopes..franciscaelainelopes@acritica.com.br', 'KOw8MoY02W', '58035350', 'Rua Joaquim Avelino Alves', 674, 'Bessa', 'João Pessoa','PB', '8336448152', '83987303673', '1,84', '77', 'B-', 'amarelo'),
    ('Heloise Sarah Mirella da Cunha', 28, '74805273577', '475413519', '04-01-1994', 'Feminino', 'Capricórnio', 'Maitê Helena Liz', 'Benício José da Cunha', 'heloisesarahmirelladacunha_@mundivox.com.br', 'W7tOCQexjD', '69312108', 'Rua Zuza Piauí', 781, 'Jardim Floresta', 'Boa Vista','RR', '9526586693', '95987569212', '1,61', '68', 'AB+', 'roxo'),
    ('Sandra Sophie Souza', 47, '81048960242', '100049539', '12-01-1975', 'Feminino', 'Capricórnio', 'Cecília Ana', 'Fábio Severino Bernardo Souza', 'sandrasophiesouza__sandrasophiesouza@gmapst.com', 'OdeR5UPkYd', '53350770', 'Rua das Princesas', 141, 'Tabajara', 'Olinda','PE', '8128878592', '81988602953', '1,53', '69', 'O+', 'roxo'),
    ('Sabrina Daniela Gomes', 35, '69130425743', '310562466', '15-01-1987', 'Feminino', 'Capricórnio', 'Maria Lúcia', 'Paulo Leandro Ryan Gomes', 'sabrinadanielagomes__sabrinadanielagomes@stricker.eu.com', 'bu1kF19Wbt', '76801760', 'Beco da Amizade', 981, 'São Sebastião', 'Porto Velho','RO', '6935595139', '69988660009', '1,79', '65', 'AB-', 'vermelho')
    `
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pacientes')
  }
}
