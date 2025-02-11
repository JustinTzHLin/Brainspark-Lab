import { Flex, Center, Text, IconButton, Image } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { LuMenu } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <Center p={3} pl={6} pr={6} borderBottomWidth={1} boxShadow="sm">
      <Flex
        align="center"
        justify="space-between"
        w={{ base: 500, md: 650, lg: 850, xl: 1100 }}
      >
        {/* Brand Name */}
        <Flex
          fontWeight="bold"
          align="center"
          gap={1}
          onClick={() => router.push("/quizform")}
          _hover={{ cursor: "pointer" }}
        >
          <Image src="/trivioasis.jpg" alt="Logo" h={5} />
          <Text fontSize="xl" color="teal.500">
            Trvioasis
          </Text>
        </Flex>

        {/* Navigation Links */}
        <Flex
          justify="space-between"
          display={{ base: "none", sm: "flex" }}
          w={{ sm: "45%", md: "40%", lg: "30%" }}
        >
          <Text
            color="gray.600"
            fontSize="lg"
            fontWeight="semibold"
            _hover={{ color: "black", cursor: "pointer" }}
            onClick={() => router.push("/quizform")}
          >
            Trivia
          </Text>
          <Text
            color="gray.600"
            fontSize="lg"
            fontWeight="semibold"
            _hover={{ color: "black", cursor: "pointer" }}
            onClick={() => router.push("/profile")}
          >
            Profile
          </Text>
          <Text
            color="gray.600"
            fontSize="lg"
            fontWeight="semibold"
            _hover={{ color: "black", cursor: "pointer" }}
            onClick={() => router.push("/history")}
          >
            History
          </Text>
        </Flex>

        {/* Mobile Hamburger Button */}
        <MenuRoot>
          <MenuTrigger
            asChild
            aria-label="Open Menu"
            display={{ base: "flex", sm: "none" }}
          >
            <IconButton variant="outline">
              <LuMenu />
            </IconButton>
          </MenuTrigger>
          <MenuContent>
            <MenuItem
              value="quizform"
              onClick={() => router.push("/quizform")}
              justifyContent="center"
            >
              Trivia
            </MenuItem>
            <MenuItem
              value="profile"
              onClick={() => router.push("/profile")}
              justifyContent="center"
            >
              Profile
            </MenuItem>
            <MenuItem
              value="history"
              onClick={() => router.push("/history")}
              justifyContent="center"
            >
              History
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Center>
  );
};

export default Navbar;
