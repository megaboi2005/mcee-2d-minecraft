let wateroffset = 0
let wateroffsety = 0
let yoffset = 0
let y = 0
let plants = 0
let playery = 0
let playerx = 0
loops.runInBackground(function on_run_in_background() {
    
})
function placetree(x: number, y: number) {
    shapes.circle(LEAVES_OAK, world(x, y + 8, 0), 5, Axis.Z, ShapeOperation.Replace)
    shapes.line(LOG_OAK, world(x, y + 5, 0), world(x, y, 0))
}

function ores(x: number, y: number, block: number) {
    
    if (block == 1) {
        shapes.circle(IRON_ORE, world(x, y - randint(5, 9), 0), randint(1, 3), Axis.Z, ShapeOperation.Replace)
    } else if (block == 2) {
        shapes.circle(COAL_ORE, world(x, y - randint(5, 9), 0), randint(1, 4), Axis.Z, ShapeOperation.Replace)
    } else if (block == 3) {
        shapes.circle(DIAMOND_ORE, world(x, y - randint(5, 9), 0), randint(1, 2), Axis.Z, ShapeOperation.Replace)
    } else if (block == 4) {
        wateroffset = randint(2, 5)
        wateroffsety = randint(2, 5)
        shapes.circle(AIR, world(x, y - wateroffsety, 0), wateroffset, Axis.Z, ShapeOperation.Replace)
        shapes.line(WATER, world(x - wateroffset, y - wateroffsety, 0), world(x + wateroffset, y - wateroffsety, 0))
    }
    
}

player.onChat("run", function on_on_chat() {
    let z: number;
    
    yoffset = 0
    y = randint(5, 50)
    for (let x = 0; x < 101; x++) {
        z = 0
        yoffset = randint(-1, 1)
        if (y == 0) {
            y += 1
        } else {
            y += yoffset
        }
        
        shapes.line(STONE, world(x, y, z), world(x, 0, z))
        shapes.line(COARSE_DIRT, world(x, y + yoffset, z), world(x, y, z))
        plants = randint(0, 20)
        if (plants == 5) {
            placetree(x, y)
        } else if (plants == 6) {
            ores(x - 5, y, 1)
        } else if (plants == 7) {
            ores(x - 5, y, 2)
        } else if (plants == 8) {
            ores(x - 5, y - 5, 3)
        } else if (plants == 9) {
            ores(x - 5, y - 5, 4)
        }
        
    }
})
loops.forever(function on_forever() {
    shapes.line(LIGHT_BLUE_CONCRETE, world(-1, 100, 0), world(-1, 0, 0))
    shapes.line(LIGHT_BLUE_CONCRETE, world(101, 100, 0), world(101, 0, 0))
    shapes.line(LIGHT_BLUE_STAINED_GLASS, world(0, 100, 0), world(101, 100, 0))
    for (let y2 = 0; y2 < 101; y2++) {
        shapes.line(LIGHT_BLUE_CONCRETE, world(0, y2, 1), world(100, y2, 1))
        shapes.line(LIGHT_BLUE_CONCRETE, world(0, y2, -1), world(100, y2, -1))
    }
    for (let index = 0; index < 10; index++) {
        mobs.spawn(PIG, positions.groundPosition(world(randint(0, 99), 100, 0)))
    }
    loops.pause(60000)
    shapes.line(YELLOW_TERRACOTTA, world(-1, y, 1), world(-1, 0, 1))
    shapes.line(YELLOW_TERRACOTTA, world(101, 100, 1), world(101, 0, 1))
    for (let y3 = 0; y3 < 101; y3++) {
        shapes.line(YELLOW_TERRACOTTA, world(0, y3, 1), world(100, y3, 1))
        shapes.line(YELLOW_TERRACOTTA, world(0, y3, -1), world(100, y3, -1))
    }
    loops.pause(30000)
    shapes.line(BLACK_WOOL, world(-1, y, 0), world(-1, 0, 0))
    shapes.line(BLACK_WOOL, world(101, 100, 0), world(101, 0, 0))
    shapes.line(BLACK_WOOL, world(0, 100, 0), world(100, 100, 0))
    for (let y4 = 0; y4 < 101; y4++) {
        shapes.line(BLACK_CONCRETE, world(0, y4, 1), world(100, y4, 1))
        shapes.line(BLACK_CONCRETE, world(0, y4, -1), world(100, y4, -1))
    }
    for (let index2 = 0; index2 < 20; index2++) {
        mobs.spawn(mobs.monster(ZOMBIE), positions.groundPosition(world(randint(0, 99), 100, 0)))
    }
    loops.pause(60000)
})
player.onChat("clear", function on_on_chat2() {
    for (let y5 = 0; y5 < 101; y5++) {
        shapes.line(AIR, world(0, y5, 0), world(100, y5, 0))
    }
})
blocks.onBlockPlaced(OAK_SAPLING, function on_block_placed_oak_sapling() {
    
    playery = player.position().getValue(Axis.Y)
    playerx = player.position().getValue(Axis.X)
    placetree(playerx, playery)
})
mobs.onMobKilled(PIG, function on_mob_killed_pig() {
    mobs.spawn(PIG, positions.groundPosition(world(randint(0, 99), 100, 0)))
})
