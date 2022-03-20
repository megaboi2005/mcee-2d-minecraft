wateroffset = 0
wateroffsety = 0
yoffset = 0
y = 0
plants = 0
playery = 0
playerx = 0

def on_run_in_background():
    pass
loops.run_in_background(on_run_in_background)

def placetree(x: number, y: number):
    shapes.circle(LEAVES_OAK,
        world(x, y + 8, 0),
        5,
        Axis.Z,
        ShapeOperation.REPLACE)
    shapes.line(LOG_OAK, world(x, y + 5, 0), world(x, y, 0))
def ores(x: number, y: number, block: number):
    global wateroffset, wateroffsety
    if block == 1:
        shapes.circle(IRON_ORE,
            world(x, y - randint(5, 9), 0),
            randint(1, 3),
            Axis.Z,
            ShapeOperation.REPLACE)
    elif block == 2:
        shapes.circle(COAL_ORE,
            world(x, y - randint(5, 9), 0),
            randint(1, 4),
            Axis.Z,
            ShapeOperation.REPLACE)
    elif block == 3:
        shapes.circle(DIAMOND_ORE,
            world(x, y - randint(5, 9), 0),
            randint(1, 2),
            Axis.Z,
            ShapeOperation.REPLACE)
    elif block == 4:
        wateroffset = randint(2, 5)
        wateroffsety = randint(2, 5)
        shapes.circle(AIR,
            world(x, y - wateroffsety, 0),
            wateroffset,
            Axis.Z,
            ShapeOperation.REPLACE)
        shapes.line(WATER,
            world(x - wateroffset, y - wateroffsety, 0),
            world(x + wateroffset, y - wateroffsety, 0))

def on_on_chat():
    global yoffset, y, plants
    yoffset = 0
    y = randint(5, 50)
    for x in range(101):
        z = 0
        yoffset = randint(-1, 1)
        if y == 0:
            y += 1
        else:
            y += yoffset
        shapes.line(STONE, world(x, y, z), world(x, 0, z))
        shapes.line(COARSE_DIRT, world(x, y + yoffset, z), world(x, y, z))
        plants = randint(0, 20)
        if plants == 5:
            placetree(x, y)
        elif plants == 6:
            ores(x - 5, y, 1)
        elif plants == 7:
            ores(x - 5, y, 2)
        elif plants == 8:
            ores(x - 5, y - 5, 3)
        elif plants == 9:
            ores(x - 5, y - 5, 4)
player.on_chat("run", on_on_chat)

def on_forever():
    shapes.line(LIGHT_BLUE_CONCRETE, world(-1, 100, 0), world(-1, 0, 0))
    shapes.line(LIGHT_BLUE_CONCRETE, world(101, 100, 0), world(101, 0, 0))
    shapes.line(LIGHT_BLUE_STAINED_GLASS,
        world(0, 100, 0),
        world(101, 100, 0))
    for y2 in range(101):
        shapes.line(LIGHT_BLUE_CONCRETE, world(0, y2, 1), world(100, y2, 1))
        shapes.line(LIGHT_BLUE_CONCRETE, world(0, y2, -1), world(100, y2, -1))
    for index in range(10):
        mobs.spawn(PIG,
            positions.ground_position(world(randint(0, 99), 100, 0)))
    loops.pause(60000)
    shapes.line(YELLOW_TERRACOTTA, world(-1, y, 1), world(-1, 0, 1))
    shapes.line(YELLOW_TERRACOTTA, world(101, 100, 1), world(101, 0, 1))
    for y3 in range(101):
        shapes.line(YELLOW_TERRACOTTA, world(0, y3, 1), world(100, y3, 1))
        shapes.line(YELLOW_TERRACOTTA, world(0, y3, -1), world(100, y3, -1))
    loops.pause(30000)
    shapes.line(BLACK_WOOL, world(-1, y, 0), world(-1, 0, 0))
    shapes.line(BLACK_WOOL, world(101, 100, 0), world(101, 0, 0))
    shapes.line(BLACK_WOOL, world(0, 100, 0), world(100, 100, 0))
    for y4 in range(101):
        shapes.line(BLACK_CONCRETE, world(0, y4, 1), world(100, y4, 1))
        shapes.line(BLACK_CONCRETE, world(0, y4, -1), world(100, y4, -1))
    for index2 in range(20):
        mobs.spawn(mobs.monster(ZOMBIE),
            positions.ground_position(world(randint(0, 99), 100, 0)))
    loops.pause(60000)
loops.forever(on_forever)

def on_on_chat2():
    for y5 in range(101):
        shapes.line(AIR, world(0, y5, 0), world(100, y5, 0))
player.on_chat("clear", on_on_chat2)

def on_block_placed_oak_sapling():
    global playery, playerx
    playery = player.position().get_value(Axis.Y)
    playerx = player.position().get_value(Axis.X)
    placetree(playerx, playery)
blocks.on_block_placed(OAK_SAPLING, on_block_placed_oak_sapling)

def on_mob_killed_pig():
    mobs.spawn(PIG,
        positions.ground_position(world(randint(0, 99), 100, 0)))
mobs.on_mob_killed(PIG, on_mob_killed_pig)
