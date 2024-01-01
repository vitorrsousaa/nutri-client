import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';

import Header from './components/Header';

const Accordion = {
  Root: ChakraAccordion,
  Panel: AccordionPanel,
  Item: AccordionItem,
  Header: Header,
};

export default Accordion;
